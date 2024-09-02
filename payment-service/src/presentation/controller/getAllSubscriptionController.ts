import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

export const getAllSubscriptionController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllSubscriptionUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAllSubscriptionUseCase(dependencies).execute();

      

      res.status(HttpStatusCode.OK).json({ success: true, data: result, message: 'get all subscription ' });
    } catch (error) {
      next(error);
    }
  };
};