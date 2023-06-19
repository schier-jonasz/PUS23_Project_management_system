import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';
import { CreateProjectDto } from '../dtos';
import { Member } from '../modules/member/models/member.model';
import { Task } from '../modules/task/models/task.model';

export type ProjectId = number;

@Entity()
export class Project {
  constructor(dto: CreateProjectDto) {
    return Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn()
  id: ProjectId;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @ManyToOne(() => Member)
  author: Member;

  @ManyToMany(() => Member)
  @JoinTable()
  members: Member[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
