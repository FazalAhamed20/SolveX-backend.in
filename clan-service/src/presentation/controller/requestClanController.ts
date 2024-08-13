import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';


export const requestClanController = (dependencies:IDependencies) => {
  const {
    useCases: { requestClanUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        const { clanId, userId } = req.body;

        console.log('..............',clanId,userId);
        

      const result=await requestClanUseCase(dependencies).execute(clanId,userId)

      console.log("result........|........",result)
      if (typeof result === 'string') {
        
        res.status(HttpStatusCode.BAD_REQUEST).send(result);
      } else if (result && 'members' in result) {
       
       
        res.status(HttpStatusCode.OK).send(result.members);
      } else {
        
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send('Unexpected result format');
      }

    
    
    } catch (error) {
      next(error);
    }
  };
};