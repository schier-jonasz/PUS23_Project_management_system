import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateProjectBodyDto,
  ProjectIdParamDto,
  UpdateProjectBodyDto,
} from './dtos';
import { ProjectService } from './project.service';
import { JwtPayload } from '../auth/dtos';
import { CreateMemberDto } from './modules/member/dtos';
import { MemberService } from './modules/member/member.service';
import { CreateTaskDto } from './modules/task/dtos';
import { TaskService } from './modules/task/task.service';
import {
  CommentIdParamDto,
  CreateCommentBodyDto,
  GetCommentsParamsDto,
} from './modules/task/modules/comment/dtos';
import { CommentService } from './modules/task/modules/comment/comment.service';

const userPayload: JwtPayload = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  isActive: true,
  sub: 1,
};

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly memberService: MemberService,
    private readonly taskService: TaskService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  async createProject(@Body() dto: CreateProjectBodyDto) {
    // todo: get payload from token

    return this.projectService.createProject(dto, userPayload);
  }

  @Get()
  async getUserProjects() {
    // todo: get id from token
    const { email } = userPayload;
    return this.projectService.getUserProjects(email);
  }

  @Get(':projectId')
  async getById(@Param() { projectId }: ProjectIdParamDto) {
    // todo: check if is author or member
    return this.projectService.getById(projectId);
  }

  @Patch(':projectId')
  async updateProject(
    @Param() { projectId }: ProjectIdParamDto,
    @Body() dto: UpdateProjectBodyDto,
  ) {
    // todo: check if is author or member
    return this.projectService.updateProject(projectId, dto);
  }

  @Delete(':projectId')
  async deleteProject(@Param() { projectId }: ProjectIdParamDto) {
    // todo: check if is author
    return this.projectService.deleteProject(projectId);
  }

  @Post(':projectId/members')
  async addMember(
    @Param() { projectId }: ProjectIdParamDto,
    @Body() dto: CreateMemberDto,
  ) {
    return this.memberService.addMemberToProject(projectId, dto);
  }

  @Post(':projectId/tasks')
  async createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Post(':projectId/tasks/:taskId/comments')
  async addComment(@Body() dto: CreateCommentBodyDto) {
    // todo: is member
    const email = 'todo: get from jwt payload';
    return this.commentService.createComment(dto, email);
  }

  @Get(':projectId/tasks/:taskId/comments')
  async getComments(@Param() { taskId }: GetCommentsParamsDto) {
    // todo: is member
    return this.commentService.getComments(taskId);
  }

  @Delete(':projectId/tasks/:taskId/comments/:commentId')
  async deleteComment(@Param() { commentId }: CommentIdParamDto) {
    // todo: is member
    return this.commentService.deleteComment(commentId);
  }
}
