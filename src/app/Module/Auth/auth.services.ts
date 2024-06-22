import { isPasswordMatched } from './auth.utiles';
import { TUser } from './../Users/users.interface';
import { User } from './../Users/users.model';

import httpStatus from "http-status";
import { TSigninUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../configs";
import AppError from "../../Errorhandler/Apperrors";
 
const register = async (payload: TUser) => {
    const user = await User.findOne({
        email: payload.email,
    });

    if (user) {
        throw new AppError(httpStatus.BAD_REQUEST, "This user is already exist !");
    }

    const result = await User.create(payload);
    const { password, ...userData } = result.toObject();
    return userData;
};

const signin = async (payload: TSigninUser) => {
    const user = await User.findOne({
        email: payload.email,
    }).select("+password");

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    const passwordMatch = await isPasswordMatched(
        payload?.password,
        user?.password
    );

    if (!passwordMatch) {
        throw new Error("Password not matched");
    }

    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string, {
        expiresIn: config.JWT_ACCESS_EXPIRES_IN as string,
    });

    const { password, ...userData } = user.toObject();

    return {
        user: userData,
        accessToken,
    };
};

export const AuthServices = { register, signin };