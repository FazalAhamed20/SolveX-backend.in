import { IDependencies } from '@/application/interfaces/IDependencies';
import { NextFunction, Request, Response } from 'express';
import { generateAccessToken } from '@/_lib/utils/jwt';
import { signupValidation } from '@/_lib/utils/validation';
import { hashPassword } from '@/_lib/utils/bcrypt';
import { userCreatedProducer } from '@/infrastructure/kafka/producer/createProducer';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCodes';

export const verifyOtpController = (dependencies: IDependencies) => {
  const {
    useCases: { verifyOtpUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Request body verify:', req.body);

      const { value, error } = signupValidation.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.message, status: 400 });
      }

      value.password = await hashPassword(value.password);

      console.log('refresh', value);

      const result = await verifyOtpUseCase(dependencies).execute(value);
      console.log('result', result);

      if (!result) {
        return res.status(400).json({
          success: false,
          message: 'OTP verification failed',
          status: 400,
        });
      }

      const accessToken = generateAccessToken({
        _id: String(result._id),
        email: String(result.email),
        isAdmin: Boolean(result?.isAdmin),
      });

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 600 * 1000,
      });
      await userCreatedProducer(result);

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        data: {
          username: result.username,
          email: result.email,
          _id: result._id,
        },
        message: 'User created successfully',
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  };
};
