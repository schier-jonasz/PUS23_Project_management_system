import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async register(): Promise<unknown> {
    return await this.authService.register();
  }

  @Post('/registration/confirm')
  async activate(): Promise<unknown> {
    return await this.authService.activate();
  }

  @Post('/login')
  async login(): Promise<unknown> {
    return await this.authService.login();
  }

  @Post('/refresh')
  async refreshTokens(): Promise<unknown> {
    return await this.authService.refreshTokens();
  }
}
