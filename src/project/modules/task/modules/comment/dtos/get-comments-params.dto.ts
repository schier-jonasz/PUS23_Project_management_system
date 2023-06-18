import { IsInt, IsPositive } from 'class-validator';
import { TaskId } from '../../../models/task.model';

export class GetCommentsParamsDto {
  @IsInt()
  @IsPositive()
  taskId: TaskId;
}
