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
import { Member } from './modules/member/models/member.model';
import { JwtPayload } from '../auth/dtos';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}

  async createProject(dto: CreateProjectBodyDto, userPayload: JwtPayload) {
    const { firstName, lastName, email } = userPayload;
    const author = new Member({ firstName, lastName, email });

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

  async getUserProjects(email: string) {
    // todo: where members emails = email
    return this.projectRepository.find({
      where: [{ author: { email } }, { members: [] }],
    });
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
}
