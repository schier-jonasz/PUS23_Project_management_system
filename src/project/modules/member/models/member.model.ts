import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateMemberDto } from '../dtos';

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

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
