import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { GetCoinQuotationUseCase } from '../../../usecases/finance/get-coin-quotation.usecase';
import { StatusCodes } from 'http-status-codes';

const useCase = container.resolve(GetCoinQuotationUseCase);

export const handleGetQuotation = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await useCase.execute();
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    next(err);
  }
};
