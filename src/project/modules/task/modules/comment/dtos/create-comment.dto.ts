import { Task } from '../../../models/task.model';

export class CreateCommentDto {
  text: string;
  task: Task;
}
