import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const blockproblemController = (dependencies: IDependencies) => {
  const {
    useCases: { blockProblemUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("body.....",req.body);
      const result = await blockProblemUseCase(dependencies).execute(req.body);

      if (!result) {
        throw new Error('Blocking Problem Failed');
      }
      console.log("Problem User",result);
      
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