import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginUseCase } from '../../../usecases/auth/login.usecase';
import { StatusCodes } from 'http-status-codes';

const loginUseCase = container.resolve(LoginUseCase);

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Email and password are required' });
    }

    const response = await loginUseCase.execute({ email, password });
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    next(err);
  }
};
