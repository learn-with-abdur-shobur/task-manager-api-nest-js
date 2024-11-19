import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: { username: string; password: string }) {
    return this.usersService.create(body.username, body.password);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
