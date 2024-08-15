import { container } from 'tsyringe';
import { SaveCoinQuotationHistoryUseCase } from '../../../usecases/finance/save-coin-quotation-history.usecase';

const useCase = container.resolve(SaveCoinQuotationHistoryUseCase);

export const handleSaveCoinQuotationHistory = async () => {
  try {
    await useCase.execute();
    console.log(`[SUCESS]: Quotation saved at ${new Date()}`);
  } catch (err) {
    console.log(
      `[ERROR]: It was not possible to save history log at ${new Date()}`
    );
  }
};
