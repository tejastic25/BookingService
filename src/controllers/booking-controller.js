const BookingService = require('../service/booking-service');
const bookingService = new BookingService();
const { StatusCodes } = require('http-status-codes');
const { CreateChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY, QUEUE_NAME } = require('../config/server-config')
class BookingController {
    constructor() {

    }

    async sendMessageToQueue(req, res) {
        const channel = await CreateChannel();
        // await channel.assertQueue(QUEUE_NAME);
        const data = { message: 'Success' };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: 'Succesfully published the event'
        });
    }

    async Create(req, res) {
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
            });
        }
    }
}

module.exports = BookingController;