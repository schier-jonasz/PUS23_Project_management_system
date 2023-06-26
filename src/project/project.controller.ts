import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  HttpCode,
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
import { CreateTaskBodyDto, UpdateTaskBodyDto } from './modules/task/dtos';
import { CreateCommentBodyDto } from './modules/task/modules/comment/dtos';
import { CommentService } from './modules/task/modules/comment/comment.service';
import { RequestWithUserPayload } from './types/request';
import { AuthGuard, IsMemberGuard, IsAuthorGuard } from './guards';
import { ProjectId } from './models/project.model';
import { ConfigService } from '@nestjs/config';
import { MemberId } from './modules/member/models/member.model';
import { TaskId } from './modules/task/models/task.model';
import { TaskService } from './modules/task/task.service';
import { CommentId } from './modules/task/modules/comment/models/comment.model';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(IsAuthorGuard)
  @Delete(':projectId')
  async deleteProject(@Param('projectId', ParseIntPipe) projectId: ProjectId) {
    await this.projectService.deleteProject(projectId);
  }

  @UseGuards(IsAuthorGuard)
  @Post(':projectId/members')
  async addMemberToProject(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Body() { userId }: CreateMemberBodyDto,
  ) {
    const newMember = await this.projectService.addMemberToProject(
      projectId,
      userId,
    );
    const path = `/projects/${projectId}/members/${newMember.id}`;

    return this.sendHateoasResponse(newMember, path);
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
  async createTask(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Body() dto: CreateTaskBodyDto,
  ) {
    const task = await this.projectService.addTaskToProject(projectId, dto);
    const path = `/projects/${projectId}/tasks/${task.id}`;

    return this.sendHateoasResponse(task, path);
  }

  @UseGuards(IsMemberGuard)
  @Get(':projectId/tasks')
  async getProjectTasks(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
  ) {
    const tasks = await this.projectService.getProjectTasks(projectId);
    const path = `/projects/${projectId}/tasks`;

    return this.sendHateoasResponse(tasks, path);
  }

  @UseGuards(IsMemberGuard)
  @Get(':projectId/tasks/:taskId')
  async getTaskById(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Param('taskId', ParseIntPipe) taskId: TaskId,
  ) {
    const task = await this.taskService.getTaskById(taskId);
    const path = `/projects/${projectId}/tasks/${taskId}`;

    return this.sendHateoasResponse(task, path);
  }

  @UseGuards(IsMemberGuard)
  @Patch(':projectId/tasks/:taskId')
  async updateTask(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Param('taskId', ParseIntPipe) taskId: TaskId,
    @Body() dto: UpdateTaskBodyDto,
  ) {
    const task = await this.taskService.updateTask(taskId, dto);
    const path = `/projects/${projectId}/tasks/${taskId}`;

    return this.sendHateoasResponse(task, path);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(IsMemberGuard)
  @Delete(':projectId/tasks/:taskId')
  async deleteTask(@Param('taskId', ParseIntPipe) taskId: TaskId) {
    return this.taskService.deleteTask(taskId);
  }

  @UseGuards(IsMemberGuard)
  @Post(':projectId/tasks/:taskId/comments')
  async addComment(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Param('taskId', ParseIntPipe) taskId: TaskId,
    @Body() dto: CreateCommentBodyDto,
    @Req() { user }: RequestWithUserPayload,
  ) {
    const comment = await this.commentService.createComment(
      dto,
      taskId,
      user.email,
    );
    const path = `/projects/${projectId}/tasks/${taskId}/comments/${comment.id}`;

    return this.sendHateoasResponse(comment, path);
  }

  @UseGuards(IsMemberGuard)
  @Get(':projectId/tasks/:taskId/comments')
  async getComments(
    @Param('projectId', ParseIntPipe) projectId: ProjectId,
    @Param('taskId', ParseIntPipe) taskId: TaskId,
  ) {
    const comments = await this.commentService.getComments(taskId);
    const path = `/projects/${projectId}/tasks/${taskId}/comments`;

    return this.sendHateoasResponse(comments, path);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(IsMemberGuard)
  @Delete(':projectId/tasks/:taskId/comments/:commentId')
  async deleteComment(@Param('commentId', ParseIntPipe) commentId: CommentId) {
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
