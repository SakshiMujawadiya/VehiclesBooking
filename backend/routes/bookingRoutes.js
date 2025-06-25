const express = require('express');
const router = express.Router();
const { bookVehicle } = require('../controllers/bookingController');
const { getBookingsByCustomer } = require('../controllers/bookingController');

router.post('/', bookVehicle);
router.get('/customer/:customerId', getBookingsByCustomer);

module.exports = router;
