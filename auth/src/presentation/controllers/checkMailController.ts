import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { generateOTP } from '@/_lib/otp/generateOtp';
import { sendOTP } from '@/_lib/otp/sendOTP';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const checkMailController = (dependencies: IDependencies) => {
  const {
    useCases: { findByEmailUseCase, signupUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body.email;
      console.log('userData', userData);

      const credentials = {
        email: userData,
        otp: await generateOTP(),
      };

      const existEmail = await findByEmailUseCase(dependencies).execute(
        credentials.email,
      );
      console.log(existEmail);

      if (existEmail) {
        sendOTP(credentials.email, credentials.otp);
      } else {
        throw new Error('No user with this email');
      }
      const result = await signupUserUseCase(dependencies).execute(credentials);
      if (!result) {
        throw new Error('OTP creation failed');
      }

      res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, data: existEmail, message: 'OTP Created' });
    } catch (error) {
      next(error);
    }
  };
};
