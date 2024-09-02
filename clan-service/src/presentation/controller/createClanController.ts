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
      

      const result=await createClanUseCase(dependencies).execute(req.body)

      
      await clanCreatedProducer(result)


      res.status(HttpStatusCode.Ok).send(result)
     

    
    
    } catch (error) {
      next(error);
    }
  };
};