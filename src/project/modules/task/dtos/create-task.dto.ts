import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

const MIN_VARCHAR_LENGTH = 2;
const MAX_VARCHAR_LENGTH = 255;

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(MIN_VARCHAR_LENGTH, MAX_VARCHAR_LENGTH)
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
