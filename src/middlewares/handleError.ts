/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/AppError';

export async function handleError(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response> {
  const isApplicationError = err instanceof AppError;
  if (isApplicationError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(`Internal server error - ${err.message}`);
  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
}
