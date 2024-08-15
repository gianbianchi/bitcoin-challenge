import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../domain/user/repository/user.repository';
import { User } from '../../domain/user/model/user';
import { AppError } from '../../shared/errors/app-error';
import { StatusCodes } from 'http-status-codes';

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

@injectable()
export class RegisterAccountUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: CreateUserDto): Promise<any> {
    const checkIfUserExistsByEmail = await this.userRepository.findByEmail(
      input.email
    );

    if (checkIfUserExistsByEmail) {
      throw new AppError('Email já cadastrado', StatusCodes.CONFLICT);
    }

    const user = new User(input);
    return await this.userRepository.create(user);
  }
}
