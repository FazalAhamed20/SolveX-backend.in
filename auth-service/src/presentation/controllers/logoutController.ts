import { Request, Response } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const logoutController = () => {
  return async (req: Request, res: Response) => {
    try {
      console.log('hai');
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      console.log('cookie cleared');

      res.status(HttpStatusCode.OK).json({ message: 'Logged out' });
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };
};
