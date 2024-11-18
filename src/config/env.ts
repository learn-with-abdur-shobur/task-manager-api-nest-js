// src/env.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfig {
  constructor(private configService: ConfigService) {}

  readonly port = this.configService.get<number>('PORT') || 8080;
  readonly host = this.configService.get<string>('HOST') || 'localhost';
  readonly databaseUrl = this.configService.get<string>('DATABASE_URL');
}

// Instantiate and export an instance of EnvironmentConfig for use across the app
export const env = new EnvironmentConfig(new ConfigService());
