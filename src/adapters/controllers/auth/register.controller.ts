import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../../../usecases/auth/register.usecase';
import { StatusCodes } from 'http-status-codes';
import { isNameValid } from '../../../shared/utils/validations/name.validation';
import { isEmailValid } from '../../../shared/utils/validations/email.validation';
import { isPasswordValid } from '../../../shared/utils/validations/password.validation';

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

    if (!isNameValid(name)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid name' });
    }

    if (!isEmailValid(email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid email' });
    }

    if (!isPasswordValid(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          'Password should contain: minimum length of 8 character, at least one uppercase and lowercase letter, at least one special character, and at least one digit',
      });
    }

    const response = await useCase.execute({ name, email, password });
    res.status(StatusCodes.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
