import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './member.service';
import { Member } from './models/member.model';
import { User } from '../../../auth/modules/user/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Member, User])],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
