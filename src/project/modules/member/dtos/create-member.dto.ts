import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import {
  MAX_VARCHAR_LENGTH,
  MIN_VARCHAR_LENGTH,
} from '../../../../utils/consts';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  @Length(MIN_VARCHAR_LENGTH, MAX_VARCHAR_LENGTH)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(MIN_VARCHAR_LENGTH, MAX_VARCHAR_LENGTH)
  lastName: string;

  @IsEmail()
  email: string;
}
