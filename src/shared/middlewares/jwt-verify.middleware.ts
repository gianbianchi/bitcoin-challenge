import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_TOKEN_SECRET } from '../constants/constants';
import { StatusCodes } from 'http-status-codes';

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, String(ACCESS_TOKEN_SECRET), (err, decoded: any) => {
      if (err) {
        return res.sendStatus(StatusCodes.FORBIDDEN);
      }
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
      next();
    });
  } catch {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};
