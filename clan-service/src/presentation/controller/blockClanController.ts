import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

export const blockClanController = (dependencies: IDependencies) => {
  const {
    useCases: { blockClanUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
      
      const result = await blockClanUseCase(dependencies).execute(req.body.isBlocked,id);

      if (!result) {
        throw new Error('Blocking Clan Failed');
      }
      
      
      res.status(HttpStatusCode.OK).json({
        success: true,
        data: result,
        message: 'Clan blocked Worked',
        isBlocked: result.isBlocked,
      });
    } catch (error) {
      next(error);
    }
  };
}