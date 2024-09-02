import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';


export const acceptClanController = (dependencies:IDependencies) => {
  const {
    useCases: { acceptClanUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        const { clanId, userId } = req.body;

        
        

      const result=await acceptClanUseCase(dependencies).execute(clanId,userId)

      
      if (typeof result === 'string') {
        
        res.status(HttpStatusCode.BAD_REQUEST).send(result);
      } else if (result && 'members' in result) {
       
       
        res.status(HttpStatusCode.OK).send({success:true,result:result});
      } else {
        
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send('Unexpected result format');
      }

    
    
    } catch (error) {
      next(error);
    }
  };
};