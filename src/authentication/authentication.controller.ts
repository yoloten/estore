import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  SerializeOptions,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';

@Controller('authentication')
@SerializeOptions({
  strategy: 'exposeAll'
})
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('sign-in')
  async signIn(@Req() request: RequestWithUser) {
    const { user } = request;

    return this.authenticationService.login(user);
  }
}
