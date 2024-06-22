
import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/Errors';
  
export const handleValidationError = (
    err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
    const errorSources: TErrorSources = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            };
        },
    );

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};

 


export const handleCastError = (
    err: mongoose.Error.CastError,
): TGenericErrorResponse => {
    const errorSources: TErrorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};

  
/* eslint-disable @typescript-eslint/no-explicit-any */

 
export const handleDuplicateError = (err: any): TGenericErrorResponse => {
     const match = err.message.match(/"([^"]*)"/);

     const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};

export default handleDuplicateError;