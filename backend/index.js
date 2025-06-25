const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const { router: authRoutes } = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

if (process.env.NODE_ENV !== 'test') {
  connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);

module.exports = app;
