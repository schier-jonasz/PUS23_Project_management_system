import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserDto, ActivateUserDto, LoginUserDto } from './dtos';
import { AuthService } from './auth.service';

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
  async login(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refreshTokens() {
    return await this.authService.refreshTokens();
  }
}
