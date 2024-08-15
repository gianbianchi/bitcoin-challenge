import { inject, injectable } from 'tsyringe';
import { IQuotationGateway } from '../../domain/quotation/gateway/quotation.gateway';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';
import { AppError } from '../../shared/errors/app-error';
import { StatusCodes } from 'http-status-codes';

type OutputDto = {
  bitCoinValue: number;
  moneyValue: number;
};

@injectable()
export class SellBitCoinUseCase {
  constructor(
    @inject('IQuotationGateway')
    private readonly quotationRequestGateway: IQuotationGateway,
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(userId: string, value: number): Promise<OutputDto> {
    const bitCoinBalance = await this.transactionRepository.getBalance(
      userId,
      'btc'
    );

    if (!bitCoinBalance?.total) {
      throw new AppError(
        'Não foi possível recuperar o saldo',
        StatusCodes.BAD_REQUEST
      );
    }

    const { buyQuotation } = await this.quotationRequestGateway.getQuotation();

    const bitCoinToSell = value / buyQuotation;

    if (bitCoinToSell > bitCoinBalance?.total) {
      throw new AppError('Saldo insuficiente', StatusCodes.BAD_REQUEST);
    }

    await this.transactionRepository.sellCoin(
      { id: userId },
      value,
      bitCoinToSell,
      buyQuotation
    );

    return {
      bitCoinValue: bitCoinToSell,
      moneyValue: value,
    };
  }
}
