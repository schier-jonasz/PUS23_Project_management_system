import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dtos';
import { Project } from './models/project.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}

  async createProject(dto: CreateProjectDto) {
    return dto;
  }
}
