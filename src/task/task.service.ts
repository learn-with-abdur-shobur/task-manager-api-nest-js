import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'; // For generating unique IDs
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(createTaskDto: CreateTaskDto, userId: string): Task {
    const newTask: Task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status || 'pending',
      userId: userId,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, updateTaskDto: Partial<CreateTaskDto>): Task | undefined {
    const task = this.findOne(id);
    if (task) {
      Object.assign(task, updateTaskDto);
    }
    return task;
  }

  updateStatus(id: string, status: TaskStatus): Task | undefined {
    const task = this.findOne(id);
    if (task) {
      task.status = status;
    }
    return task;
  }
  remove(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}
