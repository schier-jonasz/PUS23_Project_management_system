import { VerificationCode } from '../verification.model';
import { UserId } from '../../user/user.model';

export class CreateUserVerificationDto {
  verificationCode: VerificationCode;
  userId: UserId;
  expirationInMinutes: number;
}
