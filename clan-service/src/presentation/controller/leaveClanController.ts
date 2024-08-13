import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';
import {  clanUpdatedProducer } from '@/infrastructure/kafka/producer/createClanProducer';

export const leaveClanController = (dependencies:IDependencies) => {
  const {
    useCases: { deleteMemberUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clanId, _id,memberName } = req.body;

        console.log('..............',clanId,_id,memberName);
        

      const result=await deleteMemberUseCase(dependencies).execute(clanId,_id,memberName)

      console.log("result........|........",result)
      if (typeof result === 'string') {
        
        res.status(HttpStatusCode.BAD_REQUEST).send(result);
      } else if (result && 'members' in result) {
       
        await clanUpdatedProducer(result)
        res.status(HttpStatusCode.OK).send(result.members);
      } else {
        
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send('Unexpected result format');
      }

    
    
    } catch (error) {
      next(error);
    }
  };
};