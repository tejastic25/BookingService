const { BookingRepository } = require('../repository/index');
const { FLGIHT_SERVICE_PATH } = require('../config/server-config');
const { ServiceError, AppError } = require('../utils/errors/index')
const axios = require('axios');
class BookingService {

    constructor() {
        this.repository = new BookingRepository();
    }
    async CreateBoooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLGIHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            const flightPrice = flightData.price;
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError(
                    "something went wrong in service layer",
                    "insufficient seats in the flight "
                );
            }
            const totalCost = data.noOfSeats * flightPrice;
            const bookingPayLoad = { ...data, totalCost };
            const booking = await this.repository.CreateBooking(bookingPayLoad);
            const updateFlightRequestUrl = `${FLGIHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            console.log(updateFlightRequestUrl);
            await axios.patch(updateFlightRequestUrl, { totalSeats: flightData.totalSeats - booking.noOfSeats });
            const finalBooking = await this.repository.UpdateBooking(booking.id, { status: "Booked" });
            console.log(finalBooking);
            return finalBooking;


        } catch (error) {
            console.log("something went wrong in the service layer");
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }

    }

}
module.exports = BookingService;