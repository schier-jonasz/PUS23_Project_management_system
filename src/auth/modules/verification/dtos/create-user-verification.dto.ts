import { VerificationCode } from '../verification.schema';
import { UserId } from '../../user/user.model';

export class CreateUserVerificationDto {
  verificationCode: VerificationCode;
  userId: UserId;
  expirationInMinutes: number;
}
