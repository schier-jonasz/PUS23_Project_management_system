import { User } from '../../auth/modules/user/models/user.model';

export class CreateProjectDto {
  name: string;
  description?: string | null;
  author: User;
  startDate: string;
  endDate: string;
}
