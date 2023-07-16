const Booking = require('../models/booking');
const { ValidationError, ServiceError, AppError } = require('../utils/index');
const { StatusCodes } = require('http-status-codes');
class BookingRepository {
    async CreateBooking(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {

            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'cannot create booking',
                'There was some issue creating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
module.exports = CreateBooking