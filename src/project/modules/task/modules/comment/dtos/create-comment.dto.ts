import { Task } from '../../../models/task.model';
import { Member } from '../../../../member/models/member.model';

export class CreateCommentDto {
  text: string;
  author: Member;
  task: Task;
}
