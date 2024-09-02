import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

export const blockproblemController = (dependencies: IDependencies) => {
  const {
    useCases: { blockProblemUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const result = await blockProblemUseCase(dependencies).execute(req.body);

      if (!result) {
        throw new Error('Blocking Problem Failed');
      }
      
      
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: result,
        message: 'Problem Blocked Worked',
      });
    } catch (error) {
      next(error);
    }
  };
}