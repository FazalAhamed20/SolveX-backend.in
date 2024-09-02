import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

export const fetchAllMemberController = (dependencies:IDependencies) => {
  const {
    useCases: { fetchAllMembersUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        
 

      const result =await fetchAllMembersUseCase(dependencies).execute(req.body.id,req.body.name)

      

      res.status(HttpStatusCode.OK).send(result)
     

    
    
    } catch (error) {
      next(error);
    }
  };
};