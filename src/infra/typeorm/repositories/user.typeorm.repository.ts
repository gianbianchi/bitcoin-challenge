import { Repository } from 'typeorm';
import { UserGateway } from '../../../domain/user/gateway/user.gateway';
import { User } from '../../../domain/user/model/user';
import { UserEntity } from '../entities/user.entity';

export class UserTypeOrmRepository implements UserGateway {
  constructor(private readonly repository: Repository<UserEntity>) {}

  public static create(repository: Repository<UserEntity>) {
    return new UserTypeOrmRepository(repository);
  }

  async save(): Promise<void> {
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
