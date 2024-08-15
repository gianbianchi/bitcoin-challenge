import { inject, injectable } from 'tsyringe';
import { UseCase } from '../usecase';
import { IUserRepository } from '../../domain/user/repository/user.repository';

@injectable()
export class TesetUseCase implements UseCase<void, any[]> {
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(): Promise<any> {
    return await this.userRepository.findAll();
  }
}
