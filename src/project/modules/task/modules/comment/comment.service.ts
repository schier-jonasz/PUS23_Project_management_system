import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment, CommentId } from './models/comment.model';
import { CreateCommentBodyDto } from './dtos';
import { Task, TaskId } from '../../models/task.model';
import { Member } from '../../../member/models/member.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async createComment(
    { text }: CreateCommentBodyDto,
    taskId: TaskId,
    email: string,
  ) {
    const task = await this.getTask(taskId);
    const author = await this.getAuthor(email);
    const comment = new Comment({ text, task, author });

    return this.commentRepository.save(comment);
  }

  async getComments(taskId: TaskId) {
    await this.getTask(taskId);

    return this.commentRepository.find({
      where: { task: { id: taskId } },
      order: { createdAt: 'ASC' },
    });
  }

  async deleteComment(commentId: CommentId) {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException('Task with given ID was not found');
    }

    await this.commentRepository.softDelete({ id: commentId });
  }

  private async getTask(taskId: TaskId) {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException('Task with given ID was not found');
    }

    return task;
  }

  private async getAuthor(email: string) {
    const task = await this.memberRepository.findOneBy({ email });
    if (!task) {
      throw new NotFoundException('Task with given ID was not found');
    }

    return task;
  }
}
