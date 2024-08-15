import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { GetUserBalanceUseCase } from '../../../usecases/finance/get-balance.usecase';

const useCase = container.resolve(GetUserBalanceUseCase);

export const handleGetBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const response = await useCase.execute(id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
