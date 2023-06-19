import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './models/task.model';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CommentModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
