import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

export const fetchAllUsersController = (dependencies:IDependencies) => {
  const {
    useCases: { fetchAllUsersUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
 

      const result =await fetchAllUsersUseCase(dependencies).execute()

      

      res.status(HttpStatusCode.OK).send(result)
     

    
    
    } catch (error) {
      next(error);
    }
  };
};