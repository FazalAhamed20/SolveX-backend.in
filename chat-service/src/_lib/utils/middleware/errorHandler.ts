import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (!res.headersSent) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    try {
      res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
      });
    } catch (sendError) {
      console.error('Error while sending error response:', sendError);
      res.end('Internal Server Error');
    }
  } else {
    next(err);
  }
};

export default errorHandler;