import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './models/project.model';
import { MemberModule } from './modules/member/member.module';
import { Member } from './modules/member/models/member.model';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Member]),
    MemberModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, Logger],
})
export class ProjectModule {}
