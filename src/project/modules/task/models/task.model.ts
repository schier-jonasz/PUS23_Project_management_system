import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateTaskDto } from '../dtos';
import { TaskPriority } from '../enums/task-priority.enum';
import { Comment } from '../modules/comment/models/comment.model';

export type TaskId = number;

@Entity()
export class Task {
  constructor(dto: CreateTaskDto) {
    return Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn()
  id: TaskId;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Column({ type: 'date' })
  eta: string;

  // @OneToMany()
  comments: Comment[]; // todo: use relation

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
