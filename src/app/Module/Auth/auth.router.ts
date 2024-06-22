import { UserValidations } from './../Users/users.valiations';
import { AuthController } from './auth.controlers';
import { AuthValidations } from './auth.validations';

import { Router } from "express";
import validateRequest from "../../Middleware/ValidateRequest";
 
const router = Router();

router.post(
    "/signup",
    validateRequest(UserValidations.userValidationSchema),
    AuthController.register
);

router.post(
    "/signin",
    validateRequest(AuthValidations.signinUserValidationSchema),
    AuthController.signin
);

export const AuthRoutes = router;