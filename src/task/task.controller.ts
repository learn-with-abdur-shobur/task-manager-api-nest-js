import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Task[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task | undefined {
    return this.taskService.findOne(id);
  }

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Header('Authorization', 'Bearer') authHeader: string,
  ): Task {
    console.log({ authHeader });
    return this.taskService.create(createTaskDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<CreateTaskDto>,
  ): Task | undefined {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.taskService.remove(id);
  }

  @Post('/status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() status: { status: TaskStatus },
  ): Task | undefined {
    console.log(status);
    return this.taskService.updateStatus(id, status.status);
  }
}
