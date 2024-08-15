import { container } from 'tsyringe';
import { BuyBitCoinUseCase } from '../../../usecases/finance/buy-coin.usecase';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendEmail } from '../../../infra/mailer/gateways/send-email.gateway';

const useCase = container.resolve(BuyBitCoinUseCase);

export const handleBuyBitCoin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, email } = req.user;
  const { amount } = req.body;

  try {
    const response = await useCase.execute(id, amount);

    await sendEmail({
      email,
      subject: `Bitcoin purchase`,
      text: `Amount invested of R$ ${response.moneyValue}, totaling ${response.bitCoinValue} bitcoins`,
    });

    res.status(StatusCodes.NO_CONTENT).json(response);
  } catch (err) {
    next(err);
  }
};
