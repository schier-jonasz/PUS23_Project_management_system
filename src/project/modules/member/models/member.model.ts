import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CreateMemberDto } from '../dtos';
import { Comment } from '../../task/modules/comment/models/comment.model';

export type MemberId = number;

@Entity()
export class Member {
  constructor(dto: CreateMemberDto) {
    return Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn()
  id: MemberId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
