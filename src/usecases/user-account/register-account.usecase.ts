import { inject, injectable } from 'tsyringe';
import { UseCase } from '../usecase';
import { IUserRepository } from '../../domain/user/repository/user.repository';
import { User } from '../../domain/user/model/user';

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

@injectable()
export class RegisterAccountUseCase implements UseCase<CreateUserDto, any> {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: CreateUserDto): Promise<any> {
    const user = new User(input);
    return await this.userRepository.create(user);
  }
}
