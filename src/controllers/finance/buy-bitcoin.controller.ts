import { container } from 'tsyringe';
import { BuyBitCoinUseCase } from '../../usecases/finance/buy-coin.usecase';
import { Request, Response, NextFunction } from 'express';

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
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
