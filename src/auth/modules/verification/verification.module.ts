import { Logger, Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserVerification,
  UserVerificationSchema,
} from './verification.schema';
import { VerificationRepository } from './verification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserVerification.name, schema: UserVerificationSchema },
    ]),
  ],
  providers: [VerificationService, VerificationRepository, Logger],
  exports: [VerificationService],
})
export class VerificationModule {}
