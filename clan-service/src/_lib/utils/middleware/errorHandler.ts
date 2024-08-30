import { Request, Response, } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,

) => {
  console.error(err);

  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;

  const errorResponse = {
    success: false,
    error: err.message || 'Something went wrong',
    status: statusCode,
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;