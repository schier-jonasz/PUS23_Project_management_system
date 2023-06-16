import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async register(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
}
