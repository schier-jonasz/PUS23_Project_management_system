import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { addMinutes, isAfter } from 'date-fns';
import { VerificationRepository } from './verification.repository';
import { UserId } from '../user/user.model';
import {
  UserVerificationId,
  UserVerificationResponse,
  VerificationCode,
} from './verification.schema';

@Injectable()
export class VerificationService {
  constructor(
    private verificationRepository: VerificationRepository,
    private configService: ConfigService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async createUserVerification(userId: UserId) {
    const verificationCode = this.generateVerificationCode();
    const expirationInMinutes = Number(
      this.configService.get('VERIFICATION_CODE_EXPIRATION_IN_MINUTES'),
    );
    console.log({ expirationInMinutes });

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

  async checkIfCodeIsExpired(userVerification: UserVerificationResponse) {
    const { expirationInMinutes, createdAt } = userVerification;
    const now = new Date();
    const expirationTime = addMinutes(createdAt, expirationInMinutes);

    return isAfter(now, expirationTime);
  }

  async getByVerificationCode(code: VerificationCode) {
    return this.verificationRepository.getByVerificationCode(code);
  }

  async markVerificationAsUsed(id: UserVerificationId) {
    return this.verificationRepository.update(id, { isUsed: true });
  }

  async getAll() {
    return this.verificationRepository.getAll(); // todo: remove me
  }

  private generateVerificationCode() {
    return randomUUID();
  }
}
