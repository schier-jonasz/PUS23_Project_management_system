import { UserId } from '../../../../auth/modules/user/models/user.model';
import { IsInt, IsPositive } from 'class-validator';

export class CreateMemberBodyDto {
  @IsInt()
  @IsPositive()
  userId: UserId;
}
