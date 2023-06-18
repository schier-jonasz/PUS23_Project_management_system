import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { TaskId } from '../../../models/task.model';

export class CreateCommentBodyDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsInt()
  @IsPositive()
  taskId: TaskId;
}
