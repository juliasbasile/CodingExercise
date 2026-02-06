import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api.error';
import { Logger } from '../logging/logger';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof ApiError) {
    Logger.warn(`${err.statusCode} - ${err.message} - ${req.originalUrl}`);
    return res.status(err.statusCode).json({
      error: err.message
    });
  }
  
  // Fallback for unexpected errors
  Logger.error(`Unexpected error: ${err.message} - ${req.originalUrl}`);
  res.status(500).json({
    error: "Internal server error"
  });

};