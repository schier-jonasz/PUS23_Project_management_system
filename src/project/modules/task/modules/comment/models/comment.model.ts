import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CreateCommentDto } from '../dtos';
import { MemberId } from '../../../../member/models/member.model';
import { TaskId } from '../../../models/task.model';

export type CommentId = number;

@Entity()
export class Comment {
  constructor(dto: CreateCommentDto) {
    return Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn()
  id: CommentId;

  @Column()
  text: string;

  @Column()
  taskId: TaskId; // todo: use relation

  @Column()
  authorId: MemberId; // todo: use relation

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
