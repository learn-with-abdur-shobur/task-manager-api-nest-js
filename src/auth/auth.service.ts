import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private users: User[] = []; // Replace with a database in production

  constructor(private readonly jwtService: JwtService) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = this.users.find((u) => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
