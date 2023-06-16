import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './models/project.model';
import { MemberModule } from './modules/member/member.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), MemberModule, TaskModule],
  controllers: [ProjectController],
  providers: [ProjectService, ConfigService, Logger],
})
export class ProjectModule {}
