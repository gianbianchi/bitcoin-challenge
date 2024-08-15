import { User } from '../model/user';

export interface IUserRepository {
  insert(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findAll(): Promise<any[]>;
}
