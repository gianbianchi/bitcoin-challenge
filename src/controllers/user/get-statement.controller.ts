import { container } from 'tsyringe';
import { GetUserStatementUseCase } from '../../usecases/finance/get-statement.usecase';
import { Request, Response, NextFunction } from 'express';

const useCase = container.resolve(GetUserStatementUseCase);

export const handleGetUserStatement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await useCase.execute();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
