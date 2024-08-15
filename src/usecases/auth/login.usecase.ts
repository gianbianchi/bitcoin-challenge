import { inject, injectable } from 'tsyringe';
import { UseCase } from '../usecase';
import { IUserRepository } from '../../domain/user/repository/user.repository';
import * as bcrypt from 'bcrypt';

export type LoginDto = {
  email: string;
  password: string;
};

@injectable()
export class LoginUseCase implements UseCase<LoginDto, boolean> {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: LoginDto): Promise<boolean> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      return false;
    }

    if (!bcrypt.compareSync(input.password, user.password)) {
      return false;
    }

    return true;
  }
}
