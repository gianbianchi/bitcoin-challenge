import { User } from '../model/user';

export interface UserGateway {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User>;
}
