type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string | null;
};

export class User {
  private constructor(private props: UserProps) {
    this.validate();
  }

  public static create(name: string, email: string, password: string) {
    return new User({
      id: '1',
      name,
      email,
      password,
    });
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  private validate() {
    // TODO: Validação de senha
  }
}
