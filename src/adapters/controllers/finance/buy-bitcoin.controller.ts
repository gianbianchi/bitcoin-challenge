import { container } from 'tsyringe';
import { BuyBitCoinUseCase } from '../../../usecases/finance/buy-coin.usecase';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const useCase = container.resolve(BuyBitCoinUseCase);

export const handleBuyBitCoin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const { amount } = req.body;

  try {
    const response = await useCase.execute(id, amount);
    res.status(StatusCodes.NO_CONTENT).json(response);
  } catch (err) {
    next(err);
  }
};
