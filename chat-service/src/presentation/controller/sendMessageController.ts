import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const sendMessageController = (dependencies:IDependencies) => {

  const {
    useCases: { sendMessageUseCase  },
  } = dependencies;
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);


      const result=await sendMessageUseCase(dependencies).execute(req.body)

      console.log("response,result",result)

      
     
      res.status(HttpStatusCode.OK).send(result)
    
    
    } catch (error) {
      next(error);
    }
  };
};