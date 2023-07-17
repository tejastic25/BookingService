const { Booking } = require('../models/index');
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
    
    async UpdateBooking(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save();
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
module.exports = BookingRepository