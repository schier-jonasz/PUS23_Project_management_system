import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateCommentDto } from './dtos';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async register(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }
}
