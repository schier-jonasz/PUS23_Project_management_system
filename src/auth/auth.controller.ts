import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  RegisterUserDto,
  ActivateUserDto,
  LoginUserDto,
  RefreshTokensDto,
} from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/registration')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/registration/confirm')
  async activate(@Body() { code }: ActivateUserDto) {
    return this.authService.activate(code);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refreshTokens(@Body() { refreshToken }: RefreshTokensDto) {
    return this.authService.refreshTokens(refreshToken);
  }
}
