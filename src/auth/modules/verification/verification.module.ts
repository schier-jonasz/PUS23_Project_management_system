import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationService } from './verification.service';
import { Verification } from './models/verification.model';

@Module({
  imports: [TypeOrmModule.forFeature([Verification])],
  providers: [VerificationService, ConfigService, Logger],
  exports: [VerificationService],
})
export class VerificationModule {}
