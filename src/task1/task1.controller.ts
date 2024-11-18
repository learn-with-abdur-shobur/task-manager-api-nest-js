import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTask1Dto } from './dto/create-task1.dto';
import { UpdateTask1Dto } from './dto/update-task1.dto';
import { Task1Service } from './task1.service';

@Controller('task1')
@UseGuards(AuthGuard('jwt'))
export class Task1Controller {
  constructor(private readonly task1Service: Task1Service) {}

  @Post()
  create(@Body() createTask1Dto: CreateTask1Dto) {
    return this.task1Service.create(createTask1Dto);
  }

  @Get()
  findAll() {
    return this.task1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.task1Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTask1Dto: UpdateTask1Dto) {
    return this.task1Service.update(id, updateTask1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.task1Service.remove(id);
  }
}
