const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/vehicle-booking";
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
