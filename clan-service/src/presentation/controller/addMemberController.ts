import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';
import {  clanUpdatedProducer } from '@/infrastructure/kafka/producer/createClanProducer';


export const addMemberController = (dependencies: IDependencies) => {
  const {
    useCases: { addMemberUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.body", req.body);

      const result = await addMemberUseCase(dependencies).execute(req.body);

      console.log("result........|........", result);

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