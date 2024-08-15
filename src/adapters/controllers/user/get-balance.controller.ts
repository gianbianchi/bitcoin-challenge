import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { GetUserBalanceUseCase } from '../../../usecases/user/get-balance.usecase';
import { StatusCodes } from 'http-status-codes';

const useCase = container.resolve(GetUserBalanceUseCase);

export const handleGetBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const response = await useCase.execute(id);
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    next(err);
  }
};
