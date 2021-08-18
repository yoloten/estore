import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostgresErrorCode } from 'src/database/database.enum';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    try {
      const createdUser = await this.userService.create({
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

  async getAuthenticatedUser(email: string, plainPassword: string) {
    try {
      const user = await this.userService.findOneByEmail(email);

      await this.verifyPassword(plainPassword, user.password);

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

  public login(user: TokenPayload) {
    const { id, ...rest } = user;
    const payload = { ...rest, sub: id };
    const token = this.jwtService.sign(payload);
   
    return { token };
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
