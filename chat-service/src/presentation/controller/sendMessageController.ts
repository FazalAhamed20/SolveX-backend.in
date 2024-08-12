// import { IDependencies } from '@/application/interfaces/IDependencies';
// import { HttpStatusCode } from 'axios';
import { Request, Response, NextFunction } from 'express';
// // import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const sendMessageController = () => {
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      
     

    
    
    } catch (error) {
      next(error);
    }
  };
};