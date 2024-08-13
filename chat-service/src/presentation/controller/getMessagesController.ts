import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const getMessagesController = (dependencies:IDependencies) => {

  const {
    
    useCases: {getMessagesUseCase},
  } = dependencies;
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clanId } = req.params;

      console.log(clanId)


      const result=await getMessagesUseCase(dependencies).execute(clanId)

      console.log("response,result",result)

      
     
      res.status(HttpStatusCode.OK).send(result)
    
    
    } catch (error) {
      next(error);
    }
  };
};