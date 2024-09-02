import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';

export const checkSubscriptionController = (dependencies: IDependencies) => {
  const {
    useCases: { checkSubscriptionUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;

      const result = await checkSubscriptionUseCase(dependencies).execute(userId);

      

      if (result) {
        res.status(200).json({ success: true, data: result });
      } else {
        res.status(200).json({ success: false, data: null });
      }
    } catch (error) {
      next(error);
    }
  };
};
