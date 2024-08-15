import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../../../usecases/auth/register.usecase';
import { StatusCodes } from 'http-status-codes';

const useCase = container.resolve(RegisterUseCase);

export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Name, email and password are required' });
    }

    const response = await useCase.execute({ name, email, password });
    res.status(StatusCodes.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
