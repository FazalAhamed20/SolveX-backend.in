import { IDependencies } from '@/application/interfaces/IDependencies';
import { blockUserProducer } from '@/infrastructure/kafka/producer/blockUserProducer';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const blockUserController = (dependencies: IDependencies) => {
  const {
    useCases: { blockUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const result = await blockUserUseCase(dependencies).execute(req.body);

      if (!result) {
        throw new Error('Blocking User Failed');
      }
      console.log("Admin User",result);
      const data={
        isBlocked:result.isBlocked,
        email:result.email
      }
      await blockUserProducer(data)
      
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: result,
        message: 'User Blocked Worked',
        isBlocked: result.isBlocked,
      });
    } catch (error) {
      next(error);
    }
  };
};
