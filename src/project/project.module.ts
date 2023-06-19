import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './models/project.model';
import { MemberModule } from './modules/member/member.module';
import { TaskModule } from './modules/task/task.module';
import { CommentModule } from './modules/task/modules/comment/comment.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    MemberModule,
    TaskModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, Logger],
})
export class ProjectModule {}
