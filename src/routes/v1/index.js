const express = require('express')
const router = express.Router();
const BookingController = require('../../controllers/booking-controller');
const bookingController = new BookingController();
//booking crud
router.post('/booking', bookingController.Create);
//publish
router.post('/publish', bookingController.sendMessageToQueue);

module.exports = router;