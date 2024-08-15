import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(
      token,
      String(process.env.ACCESS_TOKEN_SECRET),
      (err, decoded: any) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = {
          id: decoded.id,
          email: decoded.email,
        };
        next();
      }
    );
  } catch {
    return res.sendStatus(401);
  }
};
