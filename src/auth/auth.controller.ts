import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, ActivateUserDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/registration/confirm')
  async activate(@Body() { code }: ActivateUserDto) {
    return await this.authService.activate(code);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(): Promise<unknown> {
    return await this.authService.login();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refreshTokens(): Promise<unknown> {
    return await this.authService.refreshTokens();
  }
}
