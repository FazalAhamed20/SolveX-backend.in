import { Request, Response } from 'express';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCodes';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,

) => {
  console.error(err);

  console.log('error................',err)

  const statusCode = (err as any).statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  console.log('eror..........................',err.message);

  const errorResponse = {
    success: false,
    error: err.message || 'Something went wrong',
    status: statusCode,
  };
  console.log('eror..........................',errorResponse);
  

  return res.status(statusCode).json(errorResponse);
};

export default errorHandler;