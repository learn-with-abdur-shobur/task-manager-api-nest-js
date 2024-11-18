import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateTask1Dto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'done'])
  @ApiProperty()
  status: 'pending' | 'in-progress' | 'complete';

  @ApiProperty()
  id: string;
}
