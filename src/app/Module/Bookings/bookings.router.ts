import { BookingController } from './bookings.controlers';
import { BookingValidation } from './bookings.valiations';
import { USER_ROLES } from './../Users/users.constant';
import { auth } from './../../Middleware/Auth';

import { Router } from "express";
import validateRequest from "../../Middleware/ValidateRequest";

const router = Router();

router.post(
    "/",
    auth(USER_ROLES.user),

    validateRequest ( BookingValidation.createBookingValidationSchema),
     BookingController.createBooking

);
router.get(
    "/my-bookings",
    auth(USER_ROLES.user) ,

    BookingController.getUsersBooking
);


router.get("/", auth(USER_ROLES.admin ), BookingController.getAllBookings);

export const BookingRoutes = router;