import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RequestWithUserPayload } from '../types/request';
import { ProjectService } from '../project.service';

@Injectable()
export class IsMemberGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithUserPayload = context.switchToHttp().getRequest();

    const { user, params } = request;
    const projectId = Number(params.projectId);

    const project = await this.projectService.getById(projectId);
    const isMember = project.members.some(
      (member) => member.email === user.email,
    );

    if (!isMember) {
      throw new ForbiddenException('You have to be member of this project');
    }

    return true;
  }
}
