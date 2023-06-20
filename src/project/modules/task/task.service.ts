import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskId } from './models/task.model';
import { CreateTaskBodyDto, UpdateTaskBodyDto } from './dtos';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async createTask(dto: CreateTaskBodyDto) {
    const task = new Task(dto);

    return this.taskRepository.save(task);
  }

  async getTaskById(taskId: TaskId) {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException('Task with given ID was not found');
    }

    return task;
  }

  async updateTask(taskId: TaskId, dto: UpdateTaskBodyDto) {
    const task = await this.getTaskById(taskId);

    const updatedTask = new Task({ ...task, ...dto });

    return this.taskRepository.save(updatedTask);
  }

  async deleteTask(taskId: TaskId) {
    const task = await this.getTaskById(taskId);

    return this.taskRepository.remove(task);
  }
}
