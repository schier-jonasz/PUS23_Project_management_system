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

const userPayload: JwtPayload = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  isActive: true,
  sub: 1,
};

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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

  @Get(':id')
  async getById(@Param() { projectId }: ProjectIdParamDto) {
    // todo: check if is author or member
    return this.projectService.getById(projectId);
  }

  @Patch(':id')
  async updateProject(
    @Param() { projectId }: ProjectIdParamDto,
    @Body() dto: UpdateProjectBodyDto,
  ) {
    // todo: check if is author or member
    return this.projectService.updateProject(projectId, dto);
  }

  @Delete(':id')
  async deleteProject(@Param() { projectId }: ProjectIdParamDto) {
    // todo: check if is author
    return this.projectService.deleteProject(projectId);
  }
}
