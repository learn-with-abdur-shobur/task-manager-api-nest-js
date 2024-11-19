import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = []; // In-memory user storage

  async create(username: string, password: string): Promise<User> {
    // Check if the username already exists
    const checkExistingUser = await this.findByUsername(username);
    if (checkExistingUser) {
      throw new ConflictException(
        `User with username "${username}" already exists`,
      );
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
    };
    this.users.push(newUser); // Add user to in-memory storage
    console.log(this.users); // Debug: log all users
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }

  async deleteUser(id: string): Promise<User> {
    const user = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
