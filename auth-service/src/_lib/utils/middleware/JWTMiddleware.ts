import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../../../../../common/utils/httpStatusCodes';

declare global {
  namespace Express {
    interface Request {
      user?: { _id: string; email: string; role: any };
    }
  }
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;

  console.log('accessToken', accessToken);

  if (!accessToken) {
    console.log('access expired');
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: 'Unauthorized', status: 401 });
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      String(process.env.ACCESS_TOKEN_SECRET),
    ) as { _id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: 'Unauthorized', status: 401 });
  }
};

const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return res
        .status(HttpStatusCode.FORBIDDEN)
        .json({ message: 'Forbidden', status: 403 });
    }

    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res
        .status(HttpStatusCode.FORBIDDEN)
        .json({ message: 'Forbidden', status: 403 });
    }
  };
};

export { checkAuth, authorize };
