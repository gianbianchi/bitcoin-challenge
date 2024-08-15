import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginUseCase } from '../../usecases/auth/login.usecase';

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
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const response = await loginUseCase.execute({ email, password });
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
