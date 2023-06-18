import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectBodyDto, UpdateProjectBodyDto } from './dtos';
import { Project, ProjectId } from './models/project.model';
import { User, UserId } from '../auth/modules/user/models/user.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}

  async createProject(dto: CreateProjectBodyDto, userId: UserId) {
    const author = await this.getAuthor(userId);

    const project = new Project({ ...dto, author });
    this.logger.log(`Creating project: ${project.name}`);

    return this.projectRepository.save(project);
  }

  async getById(projectId: ProjectId) {
    this.logger.log(`Fetching project with ID: ${projectId}`);
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { members: true, tasks: true },
    });

    if (!project) {
      throw new NotFoundException('Project with given ID was not found');
    }

    return project;
  }

  async getUserProjects(userId: UserId) {
    return userId;
  }

  async deleteProject(projectId: ProjectId) {
    await this.getById(projectId);

    await this.projectRepository.softDelete({ id: projectId });
  }

  async updateProject(projectId: ProjectId, dto: UpdateProjectBodyDto) {
    const project = await this.getById(projectId);

    const updatedProject = new Project({ ...project, ...dto });

    await this.projectRepository.save(updatedProject);
  }

  private async getAuthor(userId: UserId) {
    const author = await this.userRepository.findOneBy({ id: userId });
    if (!author) {
      throw new NotFoundException('User with given ID was not found');
    }

    return author;
  }
}
