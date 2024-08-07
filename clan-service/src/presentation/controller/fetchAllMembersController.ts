import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const fetchAllMemberController = (dependencies:IDependencies) => {
  const {
    useCases: { fetchAllMembersUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('./....',req.body)
 

      const result =await fetchAllMembersUseCase(dependencies).execute(req.body.id,req.body.name)

      console.log("result",result)

      res.status(HttpStatusCode.OK).send(result)
     

    
    
    } catch (error) {
      next(error);
    }
  };
};