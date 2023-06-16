import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './models/task.model';
import { TaskController } from './task.controller';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CommentModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
