import { PartialType } from '@nestjs/swagger';
import { CreateTask1Dto } from './create-task1.dto';

export class UpdateTask1Dto extends PartialType(CreateTask1Dto) {}
