import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateProjectDto } from './dtos';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async register(@Body() dto: CreateProjectDto) {
    return this.projectService.createProject(dto);
  }
}
