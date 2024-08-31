import { Request, Response } from 'express';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCodes';


interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
) => {
 
  console.error('Error:', err);

 
  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;


  const errorResponse = {
    success: false,
    error: err.message || 'An unexpected error occurred. Please try again later.',
    status: statusCode,
  };

  
  console.log('Error Response:', errorResponse);

  
  return res.status(statusCode).json(errorResponse);
};

export default errorHandler;