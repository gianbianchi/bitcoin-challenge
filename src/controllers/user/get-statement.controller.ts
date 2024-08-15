import { container } from 'tsyringe';
import { GetUserStatementUseCase } from '../../usecases/finance/get-statement.usecase';
import { Request, Response, NextFunction } from 'express';
import { isValid } from 'date-fns';
import { AppError } from '../../shared/errors/app-error';
import { StatusCodes } from 'http-status-codes';

const useCase = container.resolve(GetUserStatementUseCase);

export const handleGetUserStatement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const initialDate: any = req.query.initialDate ?? null;
    const finalDate: any = req.query.finalDate ?? null;

    if (initialDate && !isValid(new Date(initialDate))) {
      throw new AppError('Initial date must be valid', StatusCodes.BAD_REQUEST);
    }

    if (finalDate && !isValid(new Date(finalDate))) {
      throw new AppError('Final date must be valid', StatusCodes.BAD_REQUEST);
    }

    const response = await useCase.execute(id, initialDate, finalDate);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
