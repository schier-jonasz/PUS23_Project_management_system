import { IsInt, IsPositive } from 'class-validator';
import { ProjectId } from '../models/project.model';

export class ProjectIdParamDto {
  @IsInt()
  @IsPositive()
  projectId: ProjectId;
}
