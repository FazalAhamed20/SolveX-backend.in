import { Request, Response } from 'express';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCodes';

export const logoutController = () => {
  return async (req: Request, res: Response) => {
    try {
      
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      

      res.status(HttpStatusCode.OK).json({ message: 'Logged out' });
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };
};
