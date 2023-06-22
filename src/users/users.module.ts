/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Article])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
