import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { GetUserCoinBalanceUseCase } from '../../../usecases/user/get-coin-balance.usecase';
import { StatusCodes } from 'http-status-codes';

const useCase = container.resolve(GetUserCoinBalanceUseCase);

export const handleGetCoinBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const response = await useCase.execute(id);
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    next(err);
  }
};
