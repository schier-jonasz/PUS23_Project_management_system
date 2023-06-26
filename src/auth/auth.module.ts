import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './modules/user/user.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { VerificationModule } from './modules/verification/verification.module';

@Module({
  imports: [
    UserModule,
    CryptoModule,
    VerificationModule,
    ConfigModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger],
})
export class AuthModule {}
