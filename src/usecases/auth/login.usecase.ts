import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../domain/user/repository/user.repository';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export type LoginDto = {
  email: string;
  password: string;
};

@injectable()
export class LoginUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(input: LoginDto): Promise<any> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      return false;
    }

    if (!bcrypt.compareSync(input.password, user.password)) {
      return false;
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      String(process.env.ACCESS_TOKEN_SECRET),
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      String(process.env.REFRESH_TOKEN_SECRET),
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }
}
