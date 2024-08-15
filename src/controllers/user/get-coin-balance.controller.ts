import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { GetUserCoinBalanceUseCase } from '../../usecases/finance/get-coin-balance.usecase';

const useCase = container.resolve(GetUserCoinBalanceUseCase);

export const handleGetCoinBalance = async (
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
