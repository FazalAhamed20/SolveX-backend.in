import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { generateOTP } from '@/_lib/otp/generateOtp';
import { sendOTP } from '@/_lib/otp/sendOTP';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const signUpController = (dependencies: IDependencies) => {
  const {
    useCases: { signupUserUseCase, findByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body.email;
      console.log(userData);

      const credentials = {
        email: userData,
        otp: await generateOTP(),
      };
      console.log(credentials.email);

      const existEmail = await findByEmailUseCase(dependencies).execute(
        credentials.email,
      );
      console.log(existEmail);

      if (existEmail) {
        throw new Error('User already exist');
      }

      sendOTP(credentials.email, credentials.otp);

      const result = await signupUserUseCase(dependencies).execute(credentials);
      if (!result) {
        throw new Error('OTP creation failed');
      }
      console.log('result', result);

      res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, message: 'OTP Created' });
    } catch (error) {
      next(error);
    }
  };
};
