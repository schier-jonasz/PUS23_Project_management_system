import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { Comment } from './models/comment.model';
import { Task } from '../../models/task.model';
import { Member } from '../../../member/models/member.model';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Task, Member])],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
