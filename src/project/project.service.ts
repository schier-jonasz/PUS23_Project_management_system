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
import { JwtPayload } from '../auth/dtos';
import { MemberService } from './modules/member/member.service';
import { CreateMemberDto } from './modules/member/dtos';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly memberService: MemberService,
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}

  async createProject(dto: CreateProjectBodyDto, userPayload: JwtPayload) {
    const createMemberDto: CreateMemberDto = {
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
      email: userPayload.email,
    };

    const author = await this.memberService.createMember(createMemberDto);

    const project = new Project({ ...dto, author, members: [author] });
    this.logger.log(`Creating project: ${project.name}`);

    return this.projectRepository.save(project);
  }

  async getById(projectId: ProjectId) {
    this.logger.log(`Fetching project with ID: ${projectId}`);
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { members: true, tasks: true, author: true },
    });

    if (!project) {
      throw new NotFoundException('Project with given ID was not found');
    }

    return project;
  }

  async getUserProjects(email: string) {
    const projects = await this.projectRepository.find({
      relations: { members: true },
    });

    return projects.filter((project) =>
      project.members.some((member) => member.email === email),
    );
  }

  async deleteProject(projectId: ProjectId) {
    await this.getById(projectId);

    await this.projectRepository.softDelete({ id: projectId });
  }

  async updateProject(projectId: ProjectId, dto: UpdateProjectBodyDto) {
    const project = await this.getById(projectId);

    const updatedProject = new Project({ ...project, ...dto });

    return this.projectRepository.save(updatedProject);
  }
}
