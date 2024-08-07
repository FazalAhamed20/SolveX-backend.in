// auth/src/middleware/errorHandler.ts
import { Request, Response } from 'express';
import { HttpStatusCode } from '../../../../../common/utils/httpStatusCodes';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,

) => {
  console.error(err);

  const errorResponse = {
    errors: err.message || 'Something went wrong',
  };

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    data: errorResponse,
    message: errorResponse.errors,
    status: 500,
  });
};

export default errorHandler;
