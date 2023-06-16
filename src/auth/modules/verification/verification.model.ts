import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { CreateUserVerificationDto } from './dtos/create-user-verification.dto';
import { UserId } from '../user/models/user.model';

export type VerificationCode = string;
export type UserVerificationId = number;

@Entity()
export class Verification {
  constructor(dto: CreateUserVerificationDto) {
    return Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn()
  id: UserVerificationId;

  @Column()
  verificationCode: VerificationCode;

  @Column()
  userId: UserId;

  @Column({ default: false })
  isUsed: boolean;

  @Column()
  expirationInMinutes: number;

  @CreateDateColumn()
  createdAt: Date;
}
