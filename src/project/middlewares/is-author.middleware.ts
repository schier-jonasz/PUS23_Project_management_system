import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Member } from '../modules/member/models/member.model';

@Injectable()
export class IsAuthorMiddleware implements NestMiddleware {
  constructor(private readonly memberRepo: Repository<Member>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // todo: implement middleware
    next();
  }
}
