import { Role } from 'src/user/enums/user-role.enum';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEnum(Role)
  public role: Role;
}
