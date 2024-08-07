import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';

export const createSubscriptionController = (dependencies: IDependencies) => {
  const {
    useCases: { createSubscriptionUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      const result = await createSubscriptionUseCase(dependencies).execute(req.body);

      console.log('result', result);

      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };
};