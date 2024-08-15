import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { GetCoinQuotationUseCase } from '../../usecases/finance/get-coin-quotation.usecase';

const useCase = container.resolve(GetCoinQuotationUseCase);

export const handleGetQuotation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await useCase.execute();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
