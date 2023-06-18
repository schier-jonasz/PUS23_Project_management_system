import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment, CommentId } from './models/comment.model';
import { CreateCommentBodyDto } from './dtos';
import { Task, TaskId } from '../../models/task.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  public async createComment({ text, taskId }: CreateCommentBodyDto) {
    const task = await this.getTask(taskId);
    const comment = new Comment({ text, task });

    return this.commentRepository.save(comment);
  }

  public async getComments(taskId: TaskId) {
    await this.getTask(taskId);

    return this.commentRepository.find({ where: { task: { id: taskId } } });
  }

  public async deleteComment(commentId: CommentId) {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException('Task with given ID was not found');
    }

    await this.commentRepository.remove(comment);
  }

  private async getTask(taskId: TaskId) {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException('Task with given ID was not found');
    }

    return task;
  }
}
