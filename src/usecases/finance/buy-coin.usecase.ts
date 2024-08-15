import { inject, injectable } from 'tsyringe';
import { IQuotationGateway } from '../../domain/quotation/gateway/quotation.gateway';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';
import { AppError } from '../../shared/errors/app-error';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class BuyBitCoinUseCase {
  constructor(
    @inject('IQuotationGateway')
    private readonly quotationRequestGateway: IQuotationGateway,
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(userId: string, value: number): Promise<void> {
    const balance = await this.transactionRepository.getBalance(userId);

    if (!balance?.total) {
      throw new AppError(
        'Não foi possível recuperar o saldo',
        StatusCodes.BAD_REQUEST
      );
    }

    if (value > balance?.total) {
      throw new AppError('Saldo insuficiente', StatusCodes.BAD_REQUEST);
    }

    const { sellQuotation } = await this.quotationRequestGateway.getQuotation();

    const bitCoinToBuy = value / sellQuotation;

    await this.transactionRepository.buyCoin(
      { id: userId },
      value,
      bitCoinToBuy
    );

    // TODO: Enviar email informando valor dos bitcoins
  }
}
