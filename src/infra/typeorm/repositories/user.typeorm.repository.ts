import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/user/repository/user.repository';
import { User } from '../../../domain/user/model/user';
import { UserEntity } from '../entities/user.entity';

import { inject, injectable } from 'tsyringe';

@injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @inject('UserRepository')
    private readonly repository: Repository<UserEntity>
  ) {}

  async create(user: User): Promise<void> {
    const newData = this.repository.create(user);
    await this.repository.save(newData);
  }

  async findById(id: string): Promise<User> {
    const output = await this.repository.findOneOrFail({
      where: {
        id,
      },
    });

    return {
      id: output.id,
      name: output.name,
      email: output.email,
      password: output.password,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const output = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!output) {
      return null;
    }

    return {
      id: output.id,
      name: output.name,
      email: output.email,
      password: output.password,
    };
  }
}
