import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        role: any; _id: string; email: string 
};
    }
  }
}

 const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;

  console.log('accessToken', accessToken);

  if (!accessToken) {
    console.log('access expired');

    return res.status(401).json({ message: 'Unauthorized', status: 401 });
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      String(process.env.ACCESS_TOKEN_SECRET),
    ) as { _id: string; email: string,role:any };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 });
  }
};

export default checkAuth;