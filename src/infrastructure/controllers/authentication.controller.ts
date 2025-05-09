import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RegisterUserDTO } from 'src/application/dtos/register-user.dto';
import { LoginUserDTO } from 'src/application/dtos/login-user.dto';
import { RegisterService } from 'src/application/services/register.service';
import { AuthenticationService } from 'src/application/services/authentication.service';
import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @SkipAuth()
  @Post('/register')
  @HttpCode(201)
  async register(@Body() { name, email, password }: RegisterUserDTO) {
    const user = await this.registerService.register({ name, email, password });
    return user;
  }

  @SkipAuth()
  @Post('/login')
  @HttpCode(200)
  async login(@Body() { email, password }: LoginUserDTO) {
    const result = await this.authenticationService.authenticate({
      email,
      password,
    });
    return result;
  }
}
