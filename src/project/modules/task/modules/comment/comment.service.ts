import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './models/comment.model';
import { CreateCommentDto } from './dtos';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  public async createComment(dto: CreateCommentDto) {
    return dto;
  }
}
