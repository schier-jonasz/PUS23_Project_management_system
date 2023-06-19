import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { MAX_VARCHAR_LENGTH, MIN_VARCHAR_LENGTH } from '../../utils/consts';

export class CreateProjectBodyDto {
  @IsString()
  @IsNotEmpty()
  @Length(MIN_VARCHAR_LENGTH, MAX_VARCHAR_LENGTH)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
