import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
}
