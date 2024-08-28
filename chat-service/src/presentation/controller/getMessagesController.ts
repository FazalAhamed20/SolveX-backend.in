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
        console.log(clanId)


      const result=await getMessagesUseCase(dependencies).execute(clanId)

      console.log("image",result)
      
     
      res.status(HttpStatusCode.OK).send(result)
    
    
    } catch (error) {
      next(error);
    }
  };
};