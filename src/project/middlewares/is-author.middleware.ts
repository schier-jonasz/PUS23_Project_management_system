import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IsAuthorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // todo: implement middleware
    next();
  }
}
