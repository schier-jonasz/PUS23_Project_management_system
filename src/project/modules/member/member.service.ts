import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './models/member.model';
import { CreateMemberDto } from './dtos';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  public async createMember(dto: CreateMemberDto) {
    return dto;
  }
}
