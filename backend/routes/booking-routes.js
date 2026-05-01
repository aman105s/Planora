const express = require('express');
const { createBooking, getClientBookings, getVendorBookings, updateBookingStatus } = require('../controllers/booking-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/client', authMiddleware, getClientBookings);
router.get('/vendor', authMiddleware, getVendorBookings);
router.patch('/:id/status', authMiddleware, updateBookingStatus);

module.exports = router;
