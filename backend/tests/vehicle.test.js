const request = require('supertest');
const app = require('../index'); // adjust if app is exported separately
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
require('dotenv').config({ path: './.env.test' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/vehicles", () => {
  it("should create a new vehicle", async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .send({ name: "Test Truck", capacityKg: 1200, tyres: 6 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.capacityKg).toBe(1200);
  });
});
