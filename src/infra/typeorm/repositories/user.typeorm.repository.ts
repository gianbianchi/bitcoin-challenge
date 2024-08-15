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

  async insert(user: User): Promise<void> {
    const newData = this.repository.create({
      name: 'Teste Usuário',
      email: 'teste@email.com',
      password: 'teste',
    });
    await this.repository.save(newData);
  }

  async findById(id: string): Promise<User> {
    const output = await this.repository.findOneOrFail({
      where: {
        id,
      },
    });

    return User.with({
      id: output.id,
      name: output.name,
      email: output.email,
      password: output.password,
    });
  }

  async findAll() {
    return await this.repository.find();
  }
}
