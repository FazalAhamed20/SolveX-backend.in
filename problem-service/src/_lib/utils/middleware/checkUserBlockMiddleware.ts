import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import{ User} from '@/infrastructure/database/mongo/models/userModal'; 
import { HttpStatusCode } from '../../../../../common/utils/httpStatusCodes';

const checkUserBlockedMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;

    console.log("accesstoken.............",accessToken);
    

    if (!accessToken) {
     
      return next();
    }

    try {
      
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { _id: string; email: string };

      if (decoded && decoded._id && decoded.email) {
        const user = await User.findOne({ _id: decoded._id, email: decoded.email });


        console.log("user.........",user)
        
        if (user && user.isBlocked) {
          
          res.clearCookie('access_token');
          res.clearCookie('refresh_token');
          
          return res.status(403).json({
            message: 'User is blocked',

            isBlocked: true
          });
        }
      }
      
    
      next();
    } catch (error) {
      console.error('Error verifying access token or checking user blocked status:', error);
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: 'Invalid token or internal server error',
        error: (error as Error).message
      });
    }
  };
};

export default checkUserBlockedMiddleware;