import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;

  // TODO: add password validation
  @IsString()
  password: string;
}
