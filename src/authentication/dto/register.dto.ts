import { Role } from 'src/user/enums/user-role.enum';

export class RegisterDto {
  public email: string;

  public password: string;

  public name: string;

  public role: Role;
}
