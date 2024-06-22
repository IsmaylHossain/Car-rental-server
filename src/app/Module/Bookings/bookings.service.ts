import httpStatus from "http-status";
import AppError from "../../Errorhandler/Apperrors";
import { IBooking } from "./bookings.interface";
import { Booking } from "./bookings.model";
import { Car } from "../Cars/cars.model";

const createBookingIntoDB = async (payload: IBooking) => {
    const isCarExists = await Car.findByIdAndUpdate(
        payload.car,
        {
            status: "unavailable",
        },
        { new: true }
    );
    if (!isCarExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
    }
    const result = (await Booking.create(payload)).populate("user car");
    return result;
};



const getUsersBooking = async (userId: any) => {
    const result = await Booking.find({ user: userId }).populate("user car");
    return result;
};

const getAllBookings = async (query: Record<string, unknown>) => {

    const result = await Booking.find(query).populate("user car");
    
    return result;
};

export const BookingServices = {
    createBookingIntoDB,   
    getUsersBooking,
    getAllBookings,
}