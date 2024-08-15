import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../domain/user/repository/user.repository';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from '../../shared/constants/constants';
import { AppError } from '../../shared/errors/app-error';
import { StatusCodes } from 'http-status-codes';

export type LoginDto = {
  email: string;
  password: string;
};

type AuthenticationDto = {
  id: string | undefined;
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class LoginUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: LoginDto): Promise<AuthenticationDto | boolean> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new AppError(
        'Email or password incorrect',
        StatusCodes.BAD_REQUEST
      );
    }

    if (!bcrypt.compareSync(input.password, user.password)) {
      throw new AppError(
        'Email or password incorrect',
        StatusCodes.BAD_REQUEST
      );
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      String(ACCESS_TOKEN_SECRET),
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      String(REFRESH_TOKEN_SECRET),
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }
}
