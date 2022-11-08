import { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(error.statusCode).json({ error: error.message });
};

export default errorHandler;
