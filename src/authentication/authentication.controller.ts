import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';

@Controller('authentication')
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
    const {user} = request;
    const {password, ...payload} = user
    const token = this.authenticationService.login(payload);
    
    return token
  }

  // @UseGuards(JwtAuthenticationGuard)
  // @Post('sign-out')
  // async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
  //   response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
  //   return response.sendStatus(200);
  // }

  // @UseGuards(JwtAuthenticationGuard)
  // @Get()
  // authenticate(@Req() request: RequestWithUser) {
  //   const user = request.user;
  //   user.password = undefined;
  //   return user;
  // }
}
