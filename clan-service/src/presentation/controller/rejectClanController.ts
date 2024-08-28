import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';


export const rejectClanController = (dependencies:IDependencies) => {
  const {
    useCases: { rejectClanUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        const { clanId, userId } = req.body;

        console.log('..............',clanId,userId);
        

      const result=await rejectClanUseCase(dependencies).execute(clanId,userId)

      console.log("result........|........",result)
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