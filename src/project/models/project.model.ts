import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CreateProjectDto } from '../dtos';
import { Member } from '../modules/member/models/member.model';

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

  // @ManyToMany()
  members: Member[]; // todo: use relation

  // @OneToMany()
  tasks: Member[]; // todo: use relation

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
