const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
require('dotenv').config({path: './.env.test'});

let vehicleId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Insert vehicle for testing
  const vehicle = await Vehicle.create({ name: "JestVan", capacityKg: 1500, tyres: 6 });
  vehicleId = vehicle._id;
});

afterAll(async () => {
  await Booking.deleteMany({});
  await Vehicle.deleteMany({});
  await mongoose.connection.close();
});

describe("POST /api/bookings", () => {
  it("should successfully book a vehicle", async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId,
        fromPincode: "100100",
        toPincode: "100112",
        startTime: "2025-07-01T10:00:00Z",
        customerId: "CUSTOMER_X"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it("should return 409 for overlapping booking", async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId,
        fromPincode: "100100",
        toPincode: "100112",
        startTime: "2025-07-01T10:30:00Z",
        customerId: "CUSTOMER_Y"
      });

    expect(res.statusCode).toBe(409);
  });
});
