import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const blockSubscriptionController = (dependencies: IDependencies) => {
  const {
    useCases: { blockSubscriptionUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("body.....",req.body);
      const result = await blockSubscriptionUseCase(dependencies).execute(req.body);

      if (!result) {
        throw new Error('Blocking Subscription Failed');
      }
      console.log("Subscription",result);
      
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: result,
        message: 'Subscription Blocked Worked',
      });
    } catch (error) {
      next(error);
    }
  };
}