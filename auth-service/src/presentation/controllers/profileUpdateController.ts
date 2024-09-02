import { IDependencies } from '@/application/interfaces/IDependencies';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCodes';

import { Request, Response, NextFunction } from 'express';

export const profileUpdateController = (dependencies: IDependencies) => {
  const {
    useCases: { updateProfileUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      

      const result = await updateProfileUseCase(dependencies).execute(req.body);

      

      res
        .status(HttpStatusCode.OK)
        .json({ success: true, data: result, message: 'Updated Successfully' });
    } catch (error) {
      next(error);
    }
  };
};
