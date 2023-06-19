import { Request } from 'express';
import { JwtPayload } from '../../auth/dtos';

export type RequestWithUserPayload = Request & { user: JwtPayload };
