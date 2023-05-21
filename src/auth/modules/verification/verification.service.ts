import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { VerificationRepository } from './verification.repository';
import { UserId } from '../user/user.model';
import { UserVerification, VerificationCode } from './verification.schema';

@Injectable()
export class VerificationService {
  constructor(
    private verificationRepository: VerificationRepository,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async createUserVerification(userId: UserId) {
    const verificationCode = this.getVerificationCode();
    const expirationInMinutes = Number(
      process.env.VERIFICATION_CODE_EXPIRATION_IN_MINUTES,
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

  async checkIfCodeIsExpired(code: VerificationCode) {
    const userVerification =
      await this.verificationRepository.getByVerificationCode(code);

    if (!userVerification) {
      this.logger.log(
        `User verification was not found. verificationCode: [${code}]`,
      );
    }
  }

  private getVerificationCode() {
    return randomUUID();
  }

  private isExpired(userVerification: UserVerification) {
    return true;
  }
}
