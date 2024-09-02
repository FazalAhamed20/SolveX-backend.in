import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCodes';

export const userController = (dependencies: IDependencies) => {
  const {
    useCases: { getUsersUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getUsersUseCase(dependencies).execute();

      

      res
        .status(HttpStatusCode.OK)
        .json({ success: true, data: result, message: 'Users ' });
    } catch (error) {
      next(error);
    }
  };
};
