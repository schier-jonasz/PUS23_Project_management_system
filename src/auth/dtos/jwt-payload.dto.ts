import { UserId } from '../modules/user/models/user.model';

export interface JwtPayload {
  sub: UserId;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}
