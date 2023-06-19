import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './modules/user/user.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { VerificationModule } from './modules/verification/verification.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UserModule,
    CryptoModule,
    VerificationModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, AuthGuard, Logger],
  exports: [AuthGuard],
})
export class AuthModule {}
