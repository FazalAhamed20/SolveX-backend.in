import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCode';

export const reactMessageController = (dependencies:IDependencies) => {

  const {
    useCases: { reactMessageUseCase  },
  } = dependencies;
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      


      const result=await reactMessageUseCase(dependencies).execute(req.body)

     
      res.status(HttpStatusCode.OK).send({success:true,data:result})
    
    
    } catch (error) {
      next(error);
    }
  };
};