import { IsInt, IsPositive } from 'class-validator';
import { CommentId } from '../models/comment.model';

export class CommentIdParamDto {
  @IsInt()
  @IsPositive()
  commentId: CommentId;
}
