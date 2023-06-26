import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { MAX_VARCHAR_LENGTH, MIN_VARCHAR_LENGTH } from '../../utils/consts';

export class UpdateProjectBodyDto {
  @IsString()
  @IsNotEmpty()
  @Length(MIN_VARCHAR_LENGTH, MAX_VARCHAR_LENGTH)
  @IsOptional()
  name: string;

  @IsString()
  @ValidateIf((_object, value) => value !== null)
  @IsOptional()
  description: string | null;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;
}
