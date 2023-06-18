import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CreateCommentBodyDto,
  GetCommentsParamsDto,
  CommentIdParamDto,
} from './dtos';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async addComment(@Body() dto: CreateCommentBodyDto) {
    // todo: is member
    return this.commentService.createComment(dto);
  }

  @Get()
  async getComments(@Param() { taskId }: GetCommentsParamsDto) {
    // todo: is member
    return this.commentService.getComments(taskId);
  }

  @Delete()
  async deleteComment(@Param() { commentId }: CommentIdParamDto) {
    // todo: is member
    return this.commentService.deleteComment(commentId);
  }
}
