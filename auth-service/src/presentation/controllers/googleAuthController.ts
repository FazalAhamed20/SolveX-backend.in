import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { generateRandomString } from '@/_lib/otp/generateString';
import { hashPassword } from '@/_lib/utils/bcrypt';
import { generateAccessToken } from '@/_lib/utils/jwt';
import { userCreatedProducer } from '@/infrastructure/kafka/producer/createProducer';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';


export const googleAuthController = (dependencies: IDependencies) => {
  const { googleUseCase } = dependencies.useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Google Auth Request Body:', req.body);

      const { name, email } = req.body;

      let password = generateRandomString();
      console.log('Generated Password:', password);
      password = await hashPassword(password);

      const value = {
        username: name,
        email,
        password,
      };

      const result = await googleUseCase(dependencies).execute(value);

      if (!result) {
        return res.status(400).json({
          success: false,
          message: 'Authentication failed',
          status: 400,
        });
      }
      console.log(result);

      const accessToken = generateAccessToken({
        _id: String(result._id),
        email: String(result.email),
        isAdmin:Boolean(result?.isAdmin)
      });
      
      

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge:600*1000
      })
      

      console.log('Access Token:', accessToken);
      await userCreatedProducer(result)

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        data: {
          username: result.username,
          email: result.email,
          bio: result.bio,
          github: result.github,
          linkedin: result.linkedin,
          profileImage: result.profileImage,
          role: result.role,
          _id:result._id
        },
        isBlocked: result.isBlocked,
        message: 'User created successfully',
      });
    } catch (error) {
      console.log('...........................',error);
      
      next(error);
    }
  };
};
