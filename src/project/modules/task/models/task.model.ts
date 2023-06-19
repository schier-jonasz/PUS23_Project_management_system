import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CreateTaskDto } from '../dtos';
import { TaskPriority } from '../enums/task-priority.enum';
import { Comment } from '../modules/comment/models/comment.model';
import { Project } from '../../../models/project.model';

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

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @ManyToOne(() => Project)
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
