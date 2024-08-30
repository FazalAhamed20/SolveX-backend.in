import { Request, Response } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,

) => {
  console.error(err);

  const statusCode = (err as any).statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;

  const errorResponse = {
    success: false,
    error: err.message || 'Something went wrong',
    
    status: statusCode,
  };

  return res.status(statusCode).json(errorResponse);
};

export default errorHandler;