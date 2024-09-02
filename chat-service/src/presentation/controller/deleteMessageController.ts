import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCode';


export const deleteMessageController = (dependencies:IDependencies) => {
  const {
    useCases: { deleteMessageUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { messageId } = req.params;

        
        

      await deleteMessageUseCase(dependencies).execute(messageId)

      
    
        res.status(HttpStatusCode.OK).send({success:true})
    

    
    
    } catch (error) {
      next(error);
    }
  };
};