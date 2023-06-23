/* eslint-disable prettier/prettier */
import { IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    default: "Article title"
  })
  @IsString()
  @Min(5)
  readonly title: string;

  @ApiProperty({
    default: "Article body"
  })
  @IsString()
  @Min(5)
  readonly body: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to upload',
    nullable: true
  })
  image: any;
}
