import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RegisterUserDto } from '../../dtos';

export type UserId = number;

@Entity()
export class User {
  constructor(dto: RegisterUserDto) {
    return Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn()
  id: UserId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;

  @Column({ default: false })
  isActive: boolean;

  /**
   * METHODS:
   */

  activate() {
    this.isActive = true;
    return this;
  }
}
