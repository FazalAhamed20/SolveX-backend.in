import { IDependencies } from '@/application/interfaces/IDependencies';
import { signUpController } from './signUpController';
import { loginController } from './loginController';
import { verifyOtpController } from './verifyOtpController';
import { logoutController } from './logoutController';
import { googleAuthController } from './googleAuthController';
import { checkMailController } from './checkMailController';
import { userController } from './userController';
import { blockUserController } from './blockuserController';
import { profileUpdateController } from './profileUpdateController';
import { refreshTokenController } from './refreshTokenController';
import { resendOtpController } from './resendOtpController';

export const controller = (dependencies: IDependencies) => {
  return {
    signUp: signUpController(dependencies),
    login: loginController(dependencies),
    verify: verifyOtpController(dependencies),
    logout: logoutController(),
    googleIn: googleAuthController(dependencies),
    checkMail: checkMailController(dependencies),
    user: userController(dependencies),
    block: blockUserController(dependencies),
    updateProfile: profileUpdateController(dependencies),
    refreshtoken: refreshTokenController(dependencies),
    resendOtp: resendOtpController(dependencies),
  };
};
