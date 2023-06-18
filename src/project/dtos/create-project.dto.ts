import { Member } from '../modules/member/models/member.model';

export class CreateProjectDto {
  name: string;
  description?: string | null;
  author: Member;
  members?: Member[];
  startDate: string;
  endDate: string;
}
