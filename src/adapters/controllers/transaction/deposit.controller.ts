import { container } from 'tsyringe';
import {
  CreateTransactionDto,
  CreateTransactionUseCase,
} from '../../../usecases/transaction/create-transaction.usecase';
import { Request, Response, NextFunction } from 'express';

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
      return res.status(400).json({ message: 'Amount is required' });
    }

    const input: CreateTransactionDto = {
      amount,
      code: 'BRL',
      transactionType: 'CREDIT',
      userId: id,
    };

    const response = await useCase.execute(input);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
