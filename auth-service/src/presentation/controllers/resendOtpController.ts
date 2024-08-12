import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { generateOTP } from '@/_lib/otp/generateOtp';
import { sendOTP } from '@/_lib/otp/sendOTP';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

export const resendOtpController = (dependencies: IDependencies) => {
  const {
    useCases: { signupUserUseCase },
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

      sendOTP(credentials.email, credentials.otp);

      const result = await signupUserUseCase(dependencies).execute(credentials);
      if (!result) {
        throw new Error('OTP creation failed');
      }
      console.log('result', result);

      res.status(HttpStatusCode.CREATED).json({ success: true, message: 'OTP Created' });
    } catch (error) {
      next(error);
    }
  };
};
