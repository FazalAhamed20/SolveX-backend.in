import { Request, Response, NextFunction } from 'express';
import { IDependencies } from '@/application/interfaces/IDependencies';
import { generateAccessToken } from '@/_lib/utils/jwt';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCodes';

export const refreshTokenController = (dependencies: IDependencies) => {
  const {
    useCases: { refreshTokenUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('refresh token request: ', req.body);

      const result = await refreshTokenUseCase(dependencies).execute(
        req.body.email,
      );

      console.log('result: ', result);

      if (result) {
        const accessToken = generateAccessToken({
          _id: String(result._id),
          email: result.email,
        });
        res.cookie('access_token', accessToken, {
          httpOnly: true,
          maxAge: 60 * 10000,
        });
        res.status(HttpStatusCode.OK).json({ accessToken });
      } else {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: 'Unable to refresh token' });
      }
    } catch (error) {
      next(error);
    }
  };
};
