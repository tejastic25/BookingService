const express = require('express')
const router = express.Router();
const BookingController = require('../../controllers/booking-controller');

//booking crud
router.post('/booking', BookingController.Create);

module.exports = router;