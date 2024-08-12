import { IDependencies } from '@/application/interfaces/IDependencies';
import { clanCreatedProducer } from '@/infrastructure/kafka/producer/createClanProducer';
import { HttpStatusCode } from 'axios';
import { Request, Response, NextFunction } from 'express';
// import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const createClanController = (dependencies:IDependencies) => {
  const {
    useCases: { createClanUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      const result=await createClanUseCase(dependencies).execute(req.body)

      console.log("result........|........",result)
      await clanCreatedProducer(result)


      res.status(HttpStatusCode.Ok).send(result)
     

    
    
    } catch (error) {
      next(error);
    }
  };
};