import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { addMinutes, isAfter } from 'date-fns';
import { UserId } from '../user/models/user.model';
import {
  VerificationCode,
  UserVerificationId,
  Verification,
} from './verification.model';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
    private configService: ConfigService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async createUserVerification(userId: UserId) {
    const verificationCode = this.generateVerificationCode();
    const expirationInMinutes = Number(
      this.configService.get('VERIFICATION_CODE_EXPIRATION_IN_MINUTES'),
    );

    const userVerification = await this.verificationRepository.save({
      verificationCode,
      userId,
      expirationInMinutes,
    });

    this.logger.log(
      `Successfully saved user verification. verificationCode: [${verificationCode}], userId: [${userId}]`,
    );

    return userVerification;
  }

  async checkIfCodeIsExpired(userVerification: Verification) {
    const { expirationInMinutes, createdAt } = userVerification;
    const now = new Date();
    const expirationTime = addMinutes(createdAt, expirationInMinutes);

    return isAfter(now, expirationTime);
  }

  async getByVerificationCode(verificationCode: VerificationCode) {
    return this.verificationRepository.findOne({ where: { verificationCode } });
  }

  async markVerificationAsUsed(id: UserVerificationId) {
    return this.verificationRepository.update(id, { isUsed: true });
  }

  private generateVerificationCode() {
    return randomUUID();
  }
}
