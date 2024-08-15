import { container } from 'tsyringe';
import { UserTypeOrmRepository } from '../../infra/typeorm/repositories/user.typeorm.repository';
import { IUserRepository } from '../../domain/user/repository/user.repository';

import { UserEntity } from '../../infra/typeorm/entities/user.entity';
import { AppDataSource } from '../../infra/typeorm/data-source';
import { TransactionEntity } from '../../infra/typeorm/entities/transaction.entity';
import { ITransactionRepository } from '../../domain/transaction/repository/transaction.repository';
import { TransactionTypeOrmRepository } from '../../infra/typeorm/repositories/transaction.typeorm.repository';
import { IQuotationGateway } from '../../domain/quotation/gateway/quotation.gateway';
import { QuotationBitCoinMarketRequests } from '../../infra/requests/gateways/quotation.requests';
import { QuotationHistoryEntity } from '../../infra/typeorm/entities/quotation-history.entity';
import { IQuotationHistoryRepository } from '../../domain/quotation-history/repository/quotation-history.repository';
import { QuotationHistoryTypeOrmRepository } from '../../infra/typeorm/repositories/quotation-history.repository';

export const UserRepository = AppDataSource.getRepository(UserEntity);
container.registerInstance('UserRepository', UserRepository);
container.registerSingleton<IUserRepository>(
  'IUserRepository',
  UserTypeOrmRepository
);

export const TransactionRepository =
  AppDataSource.getRepository(TransactionEntity);
container.registerInstance('TransactionRepository', TransactionRepository);
container.registerSingleton<ITransactionRepository>(
  'ITransactionRepository',
  TransactionTypeOrmRepository
);

export const QuotationHistoryRepository = AppDataSource.getRepository(
  QuotationHistoryEntity
);
container.registerInstance(
  'QuotationHistoryRepository',
  QuotationHistoryRepository
);
container.registerSingleton<IQuotationHistoryRepository>(
  'IQuotationHistoryRepository',
  QuotationHistoryTypeOrmRepository
);

container.registerSingleton<IQuotationGateway>(
  'IQuotationGateway',
  QuotationBitCoinMarketRequests
);
