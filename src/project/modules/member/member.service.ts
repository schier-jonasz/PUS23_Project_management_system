import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './models/member.model';
import { CreateMemberDto } from './dtos';
import { ProjectId } from '../../models/project.model';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  public async addMemberToProject(projectId: ProjectId, dto: CreateMemberDto) {
    return dto;
  }
}
