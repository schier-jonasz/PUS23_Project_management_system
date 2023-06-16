import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dtos';

@Controller('members')
export class ProjectController {
  constructor(private readonly memberService: MemberService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async register(@Body() dto: CreateMemberDto) {
    return this.memberService.createMember(dto);
  }
}
