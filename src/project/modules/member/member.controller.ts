import { Body, Controller, Param, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dtos';
import { ProjectIdParamDto } from '../../dtos';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async addMember(
    @Param() { projectId }: ProjectIdParamDto,
    @Body() dto: CreateMemberDto,
  ) {
    return this.memberService.addMemberToProject(projectId, dto);
  }
}
