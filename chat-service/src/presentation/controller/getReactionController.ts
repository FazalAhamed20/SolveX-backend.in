import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const getReactionController = (dependencies:IDependencies) => {

  const {
    
    useCases: {getReactionUseCase},
  } = dependencies;
 

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { messageId } = req.params;


      const result=await getReactionUseCase(dependencies).execute(messageId)


      
     
      res.status(HttpStatusCode.OK).send({data:result})
    
    
    } catch (error) {
      next(error);
    }
  };
};