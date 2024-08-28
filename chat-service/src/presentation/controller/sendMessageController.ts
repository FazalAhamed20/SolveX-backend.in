import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCode';

export const sendMessageController = (dependencies:IDependencies) => {

  const {
    useCases: { sendMessageUseCase  },
  } = dependencies;
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {


      const result=await sendMessageUseCase(dependencies).execute(req.body)

      
     
      res.status(HttpStatusCode.OK).send(result)
    
    
    } catch (error) {
      next(error);
    }
  };
};