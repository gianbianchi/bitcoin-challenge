import { UseCase } from '../usecase';

export class RegisterAccountUseCase implements UseCase<any, any> {
  execute(input: any): Promise<any> {
    // Recebe dados de entrada -> Email, Nome e Senha

    throw new Error('Method not implemented.');
  }
}
