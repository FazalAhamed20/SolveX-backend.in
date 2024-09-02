import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { generateOTP } from '@/_lib/otp/generateOtp';
import { sendOTP } from '@/_lib/otp/sendOTP';
import { HttpStatusCode } from '@/_lib/utils/httpStatusCode/httpStatusCodes';

export const resendOtpController = (dependencies: IDependencies) => {
  const {
    useCases: { signupUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body.email;
      

      const credentials = {
        email: userData,
        otp: await generateOTP(),
      };
      

      sendOTP(credentials.email, credentials.otp);

      const result = await signupUserUseCase(dependencies).execute(credentials);
      if (!result) {
        throw new Error('OTP creation failed');
      }
      

      res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, message: 'OTP Created' });
    } catch (error) {
      next(error);
    }
  };
};
