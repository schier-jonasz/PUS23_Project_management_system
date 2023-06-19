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
import { CreateMemberBodyDto } from './modules/member/dtos';
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
import { ConfigService } from '@nestjs/config';
import { MemberId } from './modules/member/models/member.model';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly memberService: MemberService,
    private readonly taskService: TaskService,
    private readonly commentService: CommentService,
    private readonly config: ConfigService,
  ) {}

  @Post()
  async createProject(
    @Body() dto: CreateProjectBodyDto,
    @Req() { user }: RequestWithUserPayload,
  ) {
    const project = await this.projectService.createProject(dto, user);
    const path = `/projects/${project.id}`;

    return this.sendHateoasResponse(project, path);
  }

  @Get()
  async getUserProjects(@Req() { user }: RequestWithUserPayload) {
    const projects = await this.projectService.getUserProjects(user.email);
    const path = `/projects`;

    return this.sendHateoasResponse(projects, path);
  }

  @UseGuards(IsMemberGuard)
  @Get(':projectId')
  async getProjectById(@Param('projectId', ParseIntPipe) projectId: ProjectId) {
    const project = await this.projectService.getById(projectId);
    const path = `/projects/${projectId}`;

    return this.sendHateoasResponse(project, path);
  }

  @UseGuards(IsAuthorGuard)
  @Patch(':projectId')
  async updateProject(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Body() dto: UpdateProjectBodyDto,
  ) {
    const project = await this.projectService.updateProject(projectId, dto);
    const path = `/projects/${projectId}`;

    return this.sendHateoasResponse(project, path);
  }

  @UseGuards(IsAuthorGuard)
  @Delete(':projectId')
  async deleteProject(@Param('projectId', ParseIntPipe) projectId: ProjectId) {
    return this.projectService.deleteProject(projectId);
  }

  @UseGuards(IsAuthorGuard)
  @Post(':projectId/members')
  async addMemberToProject(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Body() { userId }: CreateMemberBodyDto,
  ) {
    const project = await this.projectService.addMemberToProject(
      projectId,
      userId,
    );
    const path = `/projects/${projectId}/members`;

    return this.sendHateoasResponse(project, path);
  }

  @UseGuards(IsAuthorGuard)
  @Delete(':projectId/members/:memberId')
  async removeMemberFromProject(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Param('memberId', ParseIntPipe) memberId: MemberId,
  ) {
    return this.projectService.removeMemberFromProject(projectId, memberId);
  }

  @UseGuards(IsMemberGuard)
  @Get(':projectId/members')
  async getProjectMembers(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
  ) {
    const members = await this.projectService.getProjectMembers(projectId);
    const path = `/projects/${projectId}/members`;

    return this.sendHateoasResponse(members, path);
  }

  @UseGuards(IsMemberGuard)
  @Post(':projectId/tasks')
  async createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @UseGuards(IsMemberGuard)
  @Post(':projectId/tasks/:taskId/comments')
  async addComment(@Body() dto: CreateCommentBodyDto) {
    const email = 'todo: get from jwt payload';
    return this.commentService.createComment(dto, email);
  }

  @UseGuards(IsMemberGuard)
  @Get(':projectId/tasks/:taskId/comments')
  async getComments(@Param() { taskId }: GetCommentsParamsDto) {
    return this.commentService.getComments(taskId);
  }

  @UseGuards(IsMemberGuard)
  @Delete(':projectId/tasks/:taskId/comments/:commentId')
  async deleteComment(@Param() { commentId }: CommentIdParamDto) {
    return this.commentService.deleteComment(commentId);
  }

  private sendHateoasResponse<T>(data: T, path: string) {
    const port = this.config.get('APP_PORT');
    const apiUrl = `http://localhost:${port}`;

    return {
      data,
      _links: {
        self: `${apiUrl}${path}`,
      },
    };
  }
}
