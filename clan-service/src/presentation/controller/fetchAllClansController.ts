import { IDependencies } from '@/application/interfaces/IDependencies';
import { ClanEntity } from '@/enterprise/entities';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const fetchAllClanController = (dependencies: IDependencies) => {
  const {
    useCases: { fetchAllClansUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
    
      const result: ClanEntity[] | null = await fetchAllClansUseCase(dependencies).execute();

      console.log("result.....", result);

    
      const response = result || [];

     
      res.status(HttpStatusCode.OK).send(response);
      
    } catch (error) {
      
      next(error);
    }
  };
};