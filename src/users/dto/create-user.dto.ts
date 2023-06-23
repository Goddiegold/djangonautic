/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: "John"
  })
  @IsString()
  @Min(5)
  readonly name: string;

  @ApiProperty({
    default: "john@hotmail.com"
  })
  @IsString()
  @Min(5)
  readonly email: string;


  @ApiProperty({
    default: "!@#$%^&*()"
  })
  @IsString()
  @Min(5)
  readonly password: string;
}
