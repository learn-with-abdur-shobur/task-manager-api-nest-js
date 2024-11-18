import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTask1Dto } from './dto/create-task1.dto';
import { UpdateTask1Dto } from './dto/update-task1.dto';
import { Task1 } from './entities/task1.entity';

@Injectable()
export class Task1Service {
  private tasks: Task1[] = [];
  create(createTask1Dto: CreateTask1Dto): Task1 {
    const newTask = {
      id: v4(),
      title: createTask1Dto.title,
      description: createTask1Dto.description,
      status: createTask1Dto.status || 'pending',
    };

    this.tasks.push(newTask);

    return newTask;
  }

  findAll(): Task1[] {
    return this.tasks;
  }

  findOne(id: string): Task1 | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, updateTask1Dto: UpdateTask1Dto): Task1 | undefined {
    const task = this.findOne(id);
    if (task) {
      Object.assign(task, updateTask1Dto);
    }
    return task;
  }

  remove(id: string) {
    return this.tasks.filter((task) => task.id !== id);
  }
}
