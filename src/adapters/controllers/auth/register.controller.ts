import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { RegisterAccountUseCase } from '../../../usecases/auth/register-account.usecase';

const useCase = container.resolve(RegisterAccountUseCase);

export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email and password are required' });
    }

    const response = await useCase.execute({ name, email, password });
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
