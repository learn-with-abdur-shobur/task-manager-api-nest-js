import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
    };
    this.usersService.create(username, hashedPassword);
    console.log(this.usersService.findAll());
    return newUser;
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // Ensure `findByUsername` is awaited
    const user = await this.usersService.findByUsername(username);

    // Check if the user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials: user not found');
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid credentials: incorrect password',
      );
    }

    // Create the JWT payload
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    // Return the access token
    return { accessToken };
  }
}
