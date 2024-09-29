/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import handleDuplicateError from '../errors/handlerDuplicateError';
import { TErrorSources } from '../interfaces/error.interface';
import { TImageFiles } from '../interfaces/image.interface';
import { deleteImageFromCloudinary } from '../utils/deleteImage';
import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  // Setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // Handle file deletion if files are present
  if (req.files && Object.keys(req.files).length > 0) {
    await deleteImageFromCloudinary(req.files as TImageFiles);
  }

  // Handle different error types
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // Send the response without returning it
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // Optionally include the raw error and stack trace in development
    err: config.NODE_ENV === 'development' ? err : undefined,
    stack: config.NODE_ENV === 'development' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
