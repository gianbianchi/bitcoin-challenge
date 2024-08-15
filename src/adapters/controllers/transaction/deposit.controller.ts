import { container } from 'tsyringe';
import {
  CreateTransactionDto,
  CreateTransactionUseCase,
} from '../../../usecases/transaction/create-transaction.usecase';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const useCase = container.resolve(CreateTransactionUseCase);

export const handleDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount } = req.body;
    const { id } = req.user;

    if (!amount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Amount is required' });
    }

    const input: CreateTransactionDto = {
      amount,
      code: 'BRL',
      transactionType: 'CREDIT',
      userId: id,
    };

    const response = await useCase.execute(input);
    res.status(StatusCodes.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
