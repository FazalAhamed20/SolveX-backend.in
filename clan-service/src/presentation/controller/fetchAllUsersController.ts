import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const fetchAllUsersController = (dependencies:IDependencies) => {
  const {
    useCases: { fetchAllUsersUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
 

      const result =await fetchAllUsersUseCase(dependencies).execute()

      console.log("result........................'",result)

      res.status(HttpStatusCode.OK).send(result)
     

    
    
    } catch (error) {
      next(error);
    }
  };
};