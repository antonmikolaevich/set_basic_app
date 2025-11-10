const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');

// Public booking routes
router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;