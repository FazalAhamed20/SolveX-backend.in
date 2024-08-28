import { Router } from 'express';
import { controller } from '@/presentation/controllers';
import { IDependencies } from '@/application/interfaces/IDependencies';

import checkUser from '@/_lib/utils/middleware/JWTMiddleware';

export const routes = (dependencies: IDependencies) => {
  const {
    signUp,
    login,
    verify,
    logout,
    googleIn,
    checkMail,
    user,
    block,
    updateProfile,
    refreshtoken,
    resendOtp,
  } = controller(dependencies);

  const router = Router();

  router.route('/signup').post(signUp);
  router.route('/login').post(login);
  router.route('/verify').post(verify);
  router.route('/logout').post(logout);
  router.route('/googleAuth').post(googleIn);
  router.route('/checkmail').post(checkMail);
  router.route('/user').get(user);
  router.route('/blockuser').post(block);
  router.route('/refresh-token').post(refreshtoken);
  router.route('/resendotp').post(resendOtp);
  router.use(checkUser);
  router.route('/ProfileUpdate').post(updateProfile);

  return router;
};
