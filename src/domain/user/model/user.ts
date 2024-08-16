import * as bcrypt from 'bcrypt';

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;

  constructor({ name, email, password }: User) {
    this.name = name;
    this.email = email;
    this.password = bcrypt.hashSync(password, 10);
  }
}
