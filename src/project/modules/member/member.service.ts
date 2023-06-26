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

  async createMember(dto: CreateMemberDto) {
    const member = new Member(dto);

    return this.memberRepository.save(member);
  }
}
