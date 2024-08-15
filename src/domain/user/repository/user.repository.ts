import { User } from '../model/user';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
