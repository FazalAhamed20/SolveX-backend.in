import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCode';

export const getMessagesController = (dependencies:IDependencies) => {

  const {
    
    useCases: {getMessagesUseCase},
  } = dependencies;
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clanId } = req.params;
        


      const result=await getMessagesUseCase(dependencies).execute(clanId)

      
      
     
      res.status(HttpStatusCode.OK).send(result)
    
    
    } catch (error) {
      next(error);
    }
  };
};