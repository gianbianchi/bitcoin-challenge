import { container } from 'tsyringe';
import { UserTypeOrmRepository } from '../../infra/typeorm/repositories/user.typeorm.repository';
import { IUserRepository } from '../../domain/user/repository/user.repository';

import { UserEntity } from '../../infra/typeorm/entities/user.entity';
import { AppDataSource } from '../../infra/typeorm/data-source';

export const UserRepository = AppDataSource.getRepository(UserEntity);
container.registerInstance('UserRepository', UserRepository);
container.registerSingleton<IUserRepository>(
  'IUserRepository',
  UserTypeOrmRepository
);
