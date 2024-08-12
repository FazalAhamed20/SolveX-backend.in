import { IDependencies } from '@/application/interfaces/IDependencies';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

import { Request, Response, NextFunction } from 'express';

export const profileUpdateController = (dependencies: IDependencies) => {
  const {
    useCases: { updateProfileUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('profile', req.body);

      const result = await updateProfileUseCase(dependencies).execute(req.body);

      console.log(result);

      res
        .status(HttpStatusCode.OK)
        .json({ success: true, data: result, message: 'Updated Successfully' });
    } catch (error) {
      next(error);
    }
  };
};
