import { IsUUID } from 'class-validator';

export class ActivateUserDto {
  @IsUUID(4)
  code: string;
}
