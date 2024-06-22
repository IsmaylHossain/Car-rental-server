import { Booking } from './../Bookings/bookings.model';
import { Car } from './cars.model';
import { TCar } from './cars.interface';

import httpStatus from "http-status";

import AppError from "../../Errorhandler/Apperrors";
import { TReturnCar } from './cars.interface';
import { convertTimeToHours } from '../../Utiles/ConvertToHourse';
//import { Car } from "./car.model";
 
const createCarIntoDB = async (carData: TCar) => {
    const result = await Car.create(carData);
    return result;

};

 

const getSingleCarFromDB = async (id: string) => {

    const isCarExists = await Car.findById(id);

     if (!isCarExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car is not found');
    }
      const result = isCarExists;


    return result;
};

const getAllCarFromDB = async () => {
    const result = await Car.find();

    return result;
};

 
const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
    const isCarExists = await Car.findById(id);

    if (!isCarExists) {

        
        throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
    }
    const result = await Car.findByIdAndUpdate(id, payload, { new: true });


    return result;

};


const returnCarFromDB = async (payload: TReturnCar) => {
 

    const isBookingExists = await Booking.findById(payload.bookingId);

    if (!isBookingExists) {

        throw new AppError(httpStatus.NOT_FOUND, " booking not found ! ");
    }
    const isCarExists = await Car.findByIdAndUpdate(
         isBookingExists.car,
        {
            status: "Available",
        },
        {
            new: true,

        }
    );
    if (!isCarExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Car not found !");
    }
    const startHours = convertTimeToHours(isBookingExists.startTime);

    const endHours = convertTimeToHours(payload.endTime);
     let durationHours = endHours - startHours;

    if (durationHours < 0) {

        durationHours += 24;
    }
    const totalCost = Number(durationHours) * Number(isCarExists.pricePerHour);

     const updatedBooking = await Booking.findByIdAndUpdate(
        payload.bookingId,
        {
            endTime: payload.endTime,
            totalCost,
        },
        {
            new: true,

        }
    ).populate("user car");
   
     return updatedBooking;
};

const deleteCarFromDB = async (id: string) => {

    const isCarExists = await Car.findById(id);

     if (!isCarExists) {
         throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
    }

    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );


     return result;

};
 

export const CarServices = {
    createCarIntoDB,
     getAllCarFromDB,
     deleteCarFromDB,
     
    returnCarFromDB,
  getSingleCarFromDB,
    updateCarIntoDB,
    
    
};  