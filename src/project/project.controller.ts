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

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() dto: CreateProjectBodyDto) {
    // todo: get id from token
    const userId = 1;
    return this.projectService.createProject(dto, userId);
  }

  @Get()
  async getUserProjects() {
    // todo: get id from token
    const userId = 1;
    return this.projectService.getUserProjects(userId);
  }

  @Get(':id')
  async getById(@Param() { id }: ProjectIdParamDto) {
    // todo: check if is author or member
    return this.projectService.getById(id);
  }

  @Patch(':id')
  async updateProject(
    @Param() { id }: ProjectIdParamDto,
    @Body() dto: UpdateProjectBodyDto,
  ) {
    // todo: check if is author or member
    return this.projectService.updateProject(id, dto);
  }

  @Delete(':id')
  async deleteProject(@Param() { id }: ProjectIdParamDto) {
    // todo: check if is author
    return this.projectService.deleteProject(id);
  }
}
