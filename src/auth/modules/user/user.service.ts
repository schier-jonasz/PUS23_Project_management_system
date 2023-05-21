import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../../dtos';
import { User, UserId } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: RegisterUserDto) {
    const user = new User(dto);
    return this.userRepository.save(user);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getById(id: UserId): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async activateUser(user: User): Promise<User | null> {
    const activatedUser = user.activate();
    return this.userRepository.save(activatedUser);
  }
}
