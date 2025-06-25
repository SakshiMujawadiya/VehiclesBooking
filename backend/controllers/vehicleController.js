const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const { calculateRideDuration, isOverlapping } = require('../utils/timeUtils');

exports.addVehicle = async (req, res) => {
  const { name, capacityKg, tyres } = req.body;
  if (!name || !capacityKg || !tyres) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const newVehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableVehicles = async (req, res) => {
  const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
  if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
    return res.status(400).json({ message: 'Missing query parameters' });
  }

  const duration = calculateRideDuration(fromPincode, toPincode);
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

  try {
    const candidates = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });

    const available = [];
    for (const v of candidates) {
      const bookings = await Booking.find({ vehicleId: v._id });

      const conflict = bookings.some(b =>
        isOverlapping(b.startTime, b.endTime, start, end)
      );

      if (!conflict) available.push(v);
    }

    res.status(200).json({ availableVehicles: available, estimatedRideDurationHours: duration });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

