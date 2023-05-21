import { Logger, Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './verification.model';

@Module({
  imports: [TypeOrmModule.forFeature([Verification])],
  providers: [VerificationService, ConfigService, Logger],
  exports: [VerificationService],
})
export class VerificationModule {}
