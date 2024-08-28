import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

export const blockpracticeController = (dependencies: IDependencies) => {
  const {
    useCases: { blockPracticeUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("body.....",req.body);
      const result = await blockPracticeUseCase(dependencies).execute(req.body);

      if (!result) {
        throw new Error('Blocking Practice Failed');
      }
      console.log("Practice User",result);
      
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: result,
        message: 'Practice Blocked Worked',
      });
    } catch (error) {
      next(error);
    }
  };
}