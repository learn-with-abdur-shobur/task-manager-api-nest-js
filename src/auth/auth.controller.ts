import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateAuthDto) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: CreateAuthDto) {
    return this.authService.login(body.username, body.password);
  }
}
