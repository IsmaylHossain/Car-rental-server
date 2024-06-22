import { User } from './../Module/Users/users.model';
import { AuthError } from './../Errorhandler/Autherrors';
import { USER_ROLES } from './../Module/Users/users.constant';
import { NextFunction, Request, Response } from "express";

import catchAsync from "../Utiles/CatchAsync";
import AppError from "../Errorhandler/Apperrors";
import httpStatus from "http-status";
import config from "../configs";
 import jwt, { JwtPayload } from "jsonwebtoken";


export const auth = (...requiredRoles: (keyof typeof USER_ROLES)[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            return AuthError(req, res);
        }

        const decoded = jwt.verify(
            token,
            config.JWT_ACCESS_SECRET as string
        ) as JwtPayload;

        if (!decoded) {
            return AuthError(req, res);
        }

        const { email, role } = decoded;

        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found !");
        }

        if (!requiredRoles.includes(role)) {
            return AuthError(req, res);
        }

        next();
    });
};