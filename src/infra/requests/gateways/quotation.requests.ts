import { injectable } from 'tsyringe';
import { IQuotationGateway } from '../../../domain/quotation/gateway/quotation.gateway';
import { Quotation } from '../../../domain/quotation/model/quotation';
import axios from 'axios';
import { AppError } from '../../../shared/errors/app-error';
import { StatusCodes } from 'http-status-codes';

type QuotationResponse = {
  high: string;
  low: string;
  vol: string;
  last: string;
  buy: string;
  sell: string;
  open: string;
  date: number;
  pair: string;
};

@injectable()
export class QuotationBitCoinMarketRequests implements IQuotationGateway {
  async getQuotation(): Promise<Quotation> {
    const data: QuotationResponse = await axios({
      method: 'get',
      url: 'https://www.mercadobitcoin.net/api/BTC/ticker/',
      responseType: 'json',
    })
      .then(function (response) {
        const data: QuotationResponse = response.data.ticker;
        return data;
      })
      .catch(function (_) {
        throw new AppError(
          'It was not possible to recover resource',
          StatusCodes.FAILED_DEPENDENCY
        );
      });

    return {
      buyQuotation: Number(data.buy),
      sellQuotation: Number(data.sell),
    };
  }
}
