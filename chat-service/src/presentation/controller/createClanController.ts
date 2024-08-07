// import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
// import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const createClanController = () => {
  const {
    useCases: { createClanUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      const result=await createClanUseCase().execute(req.body)

      console.log("result",result)
     

    
    
    } catch (error) {
      next(error);
    }
  };
};