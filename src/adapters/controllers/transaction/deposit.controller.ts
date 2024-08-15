import { container } from 'tsyringe';
import {
  CreateTransactionDto,
  CreateTransactionUseCase,
} from '../../../usecases/transaction/create-transaction.usecase';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendEmail } from '../../../infra/mailer/gateways/send-email.gateway';

const useCase = container.resolve(CreateTransactionUseCase);

export const handleDeposit = async (
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

    const input: CreateTransactionDto = {
      amount,
      code: 'BRL',
      transactionType: 'CREDIT',
      userId: id,
    };

    const response = await useCase.execute(input);

    await sendEmail({
      email,
      subject: `Deposit`,
      text: `A deposit of R$ ${amount} was made`,
    });

    res.status(StatusCodes.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
