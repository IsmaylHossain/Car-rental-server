import { auth } from './../../Middleware/Auth';
import { USER_ROLES } from './../Users/users.constant';
import { CarValidations } from './cars.valiations';
import { CarController } from './cars.controlers';

import { Router } from "express";
import validateRequest from '../../Middleware/ValidateRequest';
 


const router = Router();

router.post(
    "/",
    auth(USER_ROLES.admin),
    validateRequest(CarValidations.createCarValidationSchema),
    CarController.createCar
);

router.get("/", CarController.getAllCar);

router.get("/:id", CarController.getSingleCar);

router.put(
    "/return",
    auth(USER_ROLES.admin),
    
    validateRequest(CarValidations.returnCarValidationSchema),
    CarController.retrunAndUpdate
);

router.put(
    "/:id",
    auth(USER_ROLES.admin),

    validateRequest(CarValidations.updateCarValidationSchema),
    CarController.retrunAndUpdate
);

router.delete("/:id", CarController.deleteCar)

export const CarRoutes = router;