import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectBodyDto, UpdateProjectBodyDto } from './dtos';
import { ProjectService } from './project.service';
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
import { RequestWithUserPayload } from './types/request';
import { AuthGuard, IsMemberGuard, IsAuthorGuard } from './guards';
import { ProjectId } from './models/project.model';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly memberService: MemberService,
    private readonly taskService: TaskService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  async createProject(
    @Body() dto: CreateProjectBodyDto,
    @Req() { user }: RequestWithUserPayload,
  ) {
    return this.projectService.createProject(dto, user);
  }

  @Get()
  async getUserProjects(@Req() { user }: RequestWithUserPayload) {
    return this.projectService.getUserProjects(user.email);
  }

  @UseGuards(IsMemberGuard)
  @Get(':projectId')
  async getById(@Param('projectId', ParseIntPipe) projectId: ProjectId) {
    return this.projectService.getById(projectId);
  }

  @UseGuards(IsAuthorGuard)
  @Patch(':projectId')
  async updateProject(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Body() dto: UpdateProjectBodyDto,
  ) {
    return this.projectService.updateProject(projectId, dto);
  }

  @UseGuards(IsAuthorGuard)
  @Delete(':projectId')
  async deleteProject(@Param('projectId', ParseIntPipe) projectId: ProjectId) {
    // todo: check if is author
    return this.projectService.deleteProject(projectId);
  }

  @Post(':projectId/members')
  async addMember(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
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
