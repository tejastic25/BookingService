const BookingService = require('../service/booking-service');
const bookingService = new BookingService();
const { StatusCodes } = require('http-status-codes')

const Create = async (req, res) => {
    try {
        const booking = await bookingService.CreateBoooking(req.body);
        return res.status(201).json({
            data: booking,
            success: true,
            message: 'booking successfull',
            err: {}
        })

    } catch (error) {
        return res.status(error.StatusCodes).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        })

    }
}
module.exports = {
    Create
}
