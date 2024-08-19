import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';


export const deleteMessageController = (dependencies:IDependencies) => {
  const {
    useCases: { deleteMessageUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { messageId } = req.params;

        console.log('....',messageId);
        

      const result=await deleteMessageUseCase(dependencies).execute(messageId)

      console.log("result........|........",result)
    
        res.status(HttpStatusCode.OK).send({success:true})
    

    
    
    } catch (error) {
      next(error);
    }
  };
};