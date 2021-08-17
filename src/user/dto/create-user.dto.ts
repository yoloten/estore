import { Role } from '../enums/user-role.enum';

export class CreateUserDto {
  public email: string;

  public name: string;

  public password: string;

  public role: Role;
}
