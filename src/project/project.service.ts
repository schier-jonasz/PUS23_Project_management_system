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
import { UserId } from '../auth/modules/user/models/user.model';
import { UserService } from '../auth/modules/user/user.service';
import { MemberId } from './modules/member/models/member.model';
import { CreateTaskBodyDto } from './modules/task/dtos';
import { TaskService } from './modules/task/task.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly memberService: MemberService,
    private readonly userService: UserService,
    private readonly taskService: TaskService,
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
    this.logger.log('Fetching user projects');
    const projects = await this.projectRepository.find({
      relations: { members: true },
    });

    return projects.filter((project) =>
      project.members.some((member) => member.email === email),
    );
  }

  async deleteProject(projectId: ProjectId) {
    this.logger.log(`Trying to delete project with ID: ${projectId}`);
    await this.getById(projectId);

    await this.projectRepository.softDelete({ id: projectId });
  }

  async updateProject(projectId: ProjectId, dto: UpdateProjectBodyDto) {
    this.logger.log(`Updating project with ID: ${projectId}`);
    const project = await this.getById(projectId);

    const updatedProject = new Project({ ...project, ...dto });

    return this.projectRepository.save(updatedProject);
  }

  async addMemberToProject(projectId: ProjectId, userId: UserId) {
    this.logger.log(`Adding members to project with ID: ${projectId}`);

    const project = await this.getById(projectId);

    const user = await this.userService.getById(userId);
    if (!user) {
      throw new NotFoundException('User with given ID was not found');
    }

    const createMemberDto: CreateMemberDto = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const newMember = await this.memberService.createMember(createMemberDto);

    const projectMembers = [...project.members, newMember];
    const updatedProject: Partial<Project> = {
      id: projectId,
      members: projectMembers,
    };

    await this.projectRepository.save(updatedProject);

    return newMember;
  }

  async removeMemberFromProject(projectId: ProjectId, memberId: MemberId) {
    this.logger.log(
      `Removing member with ID: ${memberId} from project with ID: ${projectId}`,
    );

    const project = await this.getById(projectId);

    const updatedMembers = project.members.filter(
      (member) => member.id !== memberId,
    );
    const updatedProject: Partial<Project> = {
      id: projectId,
      members: updatedMembers,
    };

    return this.projectRepository.save(updatedProject);
  }

  async getProjectMembers(projectId: ProjectId) {
    this.logger.log(`Fetching members from project with ID: ${projectId}`);

    const project = await this.getById(projectId);

    return project.members;
  }

  async addTaskToProject(
    projectId: ProjectId,
    createTaskDto: CreateTaskBodyDto,
  ) {
    this.logger.log(`Adding task to project with ID: ${projectId}`);

    const project = await this.getById(projectId);

    const newTask = await this.taskService.createTask(createTaskDto);
    const projectTasks = [...project.tasks, newTask];

    const updatedProject: Partial<Project> = {
      id: projectId,
      tasks: projectTasks,
    };

    await this.projectRepository.save(updatedProject);

    return newTask;
  }

  async getProjectTasks(projectId: ProjectId) {
    this.logger.log(`Fetching tasks from project with ID: ${projectId}`);

    const project = await this.getById(projectId);

    return project.tasks;
  }
}
