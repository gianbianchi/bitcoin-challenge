import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { SellBitCoinUseCase } from '../../../usecases/finance/sell-coin.usecase';
import { StatusCodes } from 'http-status-codes';

const useCase = container.resolve(SellBitCoinUseCase);

export const handleSellBitCoin = async (
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
