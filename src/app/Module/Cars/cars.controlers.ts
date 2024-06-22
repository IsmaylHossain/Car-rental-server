import { CarServices } from './cars.service';
import sendResponse from "../../Utiles/SendResponse";
import httpStatus from "http-status";

import { Request, Response } from "express";
import catchAsync from "../../Utiles/CatchAsync";

//import { CarService } from "./Cars.service";
 
const createCar = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.createCarIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Car created successfully",
        data: result,
    });
});
 

 

const getSingleCar = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CarServices.getSingleCarFromDB(id);
    if (!result) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: " Data not Found",
            data: [],
        });
    }
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "A Car retrieved successfully",
        data: result,
    });
});
const getAllCar = catchAsync(async (req: Request, res: Response) => {
    const result = await CarServices.getAllCarFromDB();

    if (!result) {

        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: " Data not Found",
            data: [],
        });
    }
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Cars retrieved successfully",
        data: result,
    });
});
 
const deleteCar = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CarServices.deleteCarFromDB(id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Car deleted successfully",
        data: result,
    });
})

 

 const retrunAndUpdate = catchAsync(async (req: Request, res: Response) => {
    
    const path = req.path == '/return';
    if (path) {

        const bookingData = req.body;

         const result = await CarServices.returnCarFromDB(bookingData);

         sendResponse(res, {
            success: true,
             statusCode: httpStatus.OK,
            message: "Car has booked successfully",

            data: result,
        });


    } else {

        const id = req.params.id;
        const result = await CarServices.updateCarIntoDB(id, req.body);

        if (!result) {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                statusCode: httpStatus.NOT_FOUND,
                message: " Data is not Found",
                data: [],
            });
        }
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Car update successfully",
            data: result,
        });



    }
})
 

export const CarController = {

    getAllCar,
    getSingleCar,
    createCar,
    
    deleteCar,
    retrunAndUpdate
};