import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { CreateCommentDto } from '../dtos';
import { Task } from '../../../models/task.model';
import { Member } from '../../../../member/models/member.model';

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

  // @ManyToOne()
  @Column()
  task: Task; // todo: use relation

  // @ManyToOne()
  @Column()
  author: Member; // todo: use relation

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
