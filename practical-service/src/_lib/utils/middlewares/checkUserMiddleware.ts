// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// // import{ User} from '@/infrastructure/database/mongo/models/user'; // Adjust the import path as needed

// const checkUserBlockedMiddleware = () => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const accessToken = req.cookies.access_token;

//     console.log("accesstoken",accessToken);
    

//     if (!accessToken) {
//       // No access token found, proceed to the next middleware
//       return next();
//     }

//     try {
//       // Verify and decode the access token
//       const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string) as { _id: string; email: string };

//       if (decoded && decoded._id && decoded.email) {
//         const user = await User.findOne({ _id: decoded._id, email: decoded.email });
        
//         if (user && user.isBlocked) {
//           // Clear the tokens if the user is blocked
//           res.clearCookie('access_token');
//           res.clearCookie('refresh_token');
          
//           return res.status(403).json({
//             message: 'User is blocked',
//             isBlocked: true
//           });
//         }
//       }
      
//       // User is not blocked or token is invalid, proceed to the next middleware
//       next();
//     } catch (error) {
//       console.error('Error verifying access token or checking user blocked status:', error);
//       return res.status(401).json({
//         message: 'Invalid token or internal server error',
//         error: (error as Error).message
//       });
//     }
//   };
// };

// export default checkUserBlockedMiddleware;