import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import * as bcrypt from 'bcrypt';

export class User {
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  password: string;

  constructor({ name, email, password }: User) {
    this.name = name;
    this.email = email;
    this.password = bcrypt.hashSync(password, 10);
  }
}
