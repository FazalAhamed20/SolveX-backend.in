import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const reactMessageController = (dependencies:IDependencies) => {

  const {
    useCases: { reactMessageUseCase  },
  } = dependencies;
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("body",req.body);


      const result=await reactMessageUseCase(dependencies).execute(req.body)

     

      console.log("res.............",result)
     
      res.status(HttpStatusCode.OK).send({success:true,data:result})
    
    
    } catch (error) {
      next(error);
    }
  };
};