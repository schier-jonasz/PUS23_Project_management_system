import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

const MIN_VARCHAR_LENGTH = 2;
const MAX_VARCHAR_LENGTH = 255;

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
