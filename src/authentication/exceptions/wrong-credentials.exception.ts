import { HttpException, HttpStatus } from '@nestjs/common';

class WrongCredentials extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'Wrong credentials provided',
        code: 'WRONG_CREDENTIALS',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
