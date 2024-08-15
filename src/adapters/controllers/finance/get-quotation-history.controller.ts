import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { GetQuotationHistoryUseCase } from '../../../usecases/finance/get-quotation-history.usecase';

const useCase = container.resolve(GetQuotationHistoryUseCase);

export const handleGetQuotationHistory = async (
  _: Request,
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
