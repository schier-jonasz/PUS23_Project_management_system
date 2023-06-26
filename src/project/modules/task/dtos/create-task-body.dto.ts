import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import {
  MAX_VARCHAR_LENGTH,
  MIN_VARCHAR_LENGTH,
} from '../../../../utils/consts';
import { TaskPriority } from '../enums/task-priority.enum';

export class CreateTaskBodyDto {
  @IsString()
  @IsNotEmpty()
  @Length(MIN_VARCHAR_LENGTH, MAX_VARCHAR_LENGTH)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority: TaskPriority;

  @IsDateString()
  eta: string;
}
