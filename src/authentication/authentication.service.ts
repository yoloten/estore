import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostgresErrorCode } from 'src/database/database.enum';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UserService) {}

  async register(registerData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registerData,
        password: hashedPassword,
      });
      const { password, ...returnUser } = createdUser;

      return returnUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'User with this email is already exists',
            code: 'EMAIL_ALREADY_EXISTS',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);

      await this.verifyPassword(user.password, hashedPassword);

      user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong credentials provided',
          code: 'WRONG_CREDENTIALS',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
