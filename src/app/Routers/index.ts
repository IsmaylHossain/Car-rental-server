import { AuthRoutes } from './../Module/Auth/auth.router';
import { BookingRoutes } from './../Module/Bookings/bookings.router';
import { CarRoutes } from './../Module/Cars/cars.router';

import { Router } from "express";
 

const router = Router();

const moduleRoutes = [
    {
      path: '/auth',
        route: AuthRoutes,
    },

    {
        path: "/cars",
         route: CarRoutes,
    },
    {
        path: "/bookings",

        route: BookingRoutes,
    },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));


export default router;