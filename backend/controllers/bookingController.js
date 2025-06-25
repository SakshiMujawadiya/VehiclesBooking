const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const mongoose = require('mongoose');

const { calculateRideDuration, isOverlapping } = require('../utils/timeUtils');

exports.bookVehicle = async (req, res) => {
  const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;
  if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
    return res.status(400).json({ message: 'Missing fields in request' });
  }
if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ message: 'Invalid vehicle ID' });
  }
  
  const duration = calculateRideDuration(fromPincode, toPincode);
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const existingBookings = await Booking.find({ vehicleId });

    const conflict = existingBookings.some(b =>
      isOverlapping(b.startTime, b.endTime, start, end)
    );

    if (conflict) return res.status(409).json({ message: 'Vehicle already booked for this time' });

    const booking = await Booking.create({
      vehicleId, fromPincode, toPincode, startTime: start, endTime: end, customerId
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getBookingsByCustomer = async (req, res) => {
  const { customerId } = req.params;
  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }

  try {
    const bookings = await Booking.find({ customerId }).populate('vehicleId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  if (!bookingId) {
    return res.status(400).json({ message: 'Booking ID is required' });
  }

  try {
    const booking = await
      Booking.findByIdAndDelete(bookingId);
    if (!booking) {  

      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
