/* eslint-disable prettier/prettier */
import { IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Min(5)
  readonly name: string;

  @IsString()
  @Min(5)
  readonly email: string;

  @IsString()
  @Min(5)
  readonly password: string;
}
