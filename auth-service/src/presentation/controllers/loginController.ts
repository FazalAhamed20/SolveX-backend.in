import { Request, Response, NextFunction } from 'express';
import { IDependencies } from '@/application/interfaces/IDependencies';
import { loginValidation } from '@/_lib/utils/validation';
import { generateAccessToken, generateRefreshToken } from '@/_lib/utils/jwt';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const loginController = (dependencies: IDependencies) => {
  const {
    useCases: { loginUseCase, refreshUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      const credentials = req.body;

      const { value, error } = await loginValidation.validate(credentials);

      if (error) {
        throw new Error(error.message);
      }
      const result = await loginUseCase(dependencies).execute(
        value.email,
        value.password,
      );

      if (!result) {
        throw new Error('User logged failed');
      }

      console.log('result.......', result);
      const refreshToken = generateRefreshToken({
        _id: String(result?._id),
        email: result?.email,
      });

      await refreshUseCase(dependencies).execute(value.email, refreshToken);

      const accessToken = generateAccessToken({
        _id: String(result?._id),
        email: result?.email,
        isAdmin: result?.isAdmin,
      });

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 600 * 1000,
      });

      res.status(HttpStatusCode.OK).json({
        success: true,
        data: {
          username: result.username,
          email: result.email,
          bio: result.bio,
          github: result.github,
          linkedin: result.linkedin,
          profileImage: result.profileImage,
          role: result.role,
          _id: result._id,

          twitter: result.twitter,
        },
        message: 'User logged in',
        isAdmin: result.isAdmin,
      });
    } catch (error) {
      next(error);
    }
  };
};
