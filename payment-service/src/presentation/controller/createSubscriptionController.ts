import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';

export const createSubscriptionController = (dependencies: IDependencies) => {
  const {
    useCases: { createSubscriptionUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      

      const result = await createSubscriptionUseCase(dependencies).execute(req.body);

      

      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };
};