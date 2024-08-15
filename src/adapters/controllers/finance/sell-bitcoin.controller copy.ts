import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { SellBitCoinUseCase } from '../../../usecases/finance/sell-coin.usecase';
import { StatusCodes } from 'http-status-codes';
import { sendEmail } from '../../../infra/mailer/gateways/send-email.gateway';

const useCase = container.resolve(SellBitCoinUseCase);

export const handleSellBitCoin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, email } = req.user;
    const { amount } = req.body;

    if (!amount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Amount is required' });
    }

    const amountValidation = !isNaN(parseFloat(amount)) && isFinite(amount);

    if (!amountValidation) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Amount must be numeric' });
    }

    if (amount <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Amount must be greater than zero' });
    }

    const response = await useCase.execute(id, amount);

    await sendEmail({
      email,
      subject: `Bitcoin sale`,
      text: `The amount sold in bitcoins was ${response.bitCoinValue}. Total redemption of R$ ${response.moneyValue}`,
    });

    res.status(StatusCodes.NO_CONTENT).json(response);
  } catch (err) {
    next(err);
  }
};
