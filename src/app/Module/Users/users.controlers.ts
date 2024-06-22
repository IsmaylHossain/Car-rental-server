import { userService } from './users.service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../Utiles/CatchAsync';
import sendResponse from '../../Utiles/SendResponse';

const signup = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createsignupIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

export const userController = {
    signup,
};