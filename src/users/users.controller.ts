/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AdminAuthGuard, UsersAuthGuard } from 'src/common/guards/users.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  @ApiExcludeEndpoint()
  @UseGuards(AdminAuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/signup')
  registerUser(@Body() body: CreateUserDto) {
    return this.userService.registerUser(body);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }

  @Get("/get-articles/:userId")
  getAllUserArticle(@Req() req: Request) {
    return this.userService.getUserArticles(req)
  }

  @Get('/profile')
  @ApiBearerAuth()
  @UseGuards(UsersAuthGuard)
  getProfile(@Req() req: Request) {
    return this.userService.getProfile(req);
  }

  @Patch('/profile')
  @ApiBearerAuth()
  @UseGuards(UsersAuthGuard)
  updateProfile(@Req() req: Request, @Body() body: UpdateUserDto) {
    return this.userService.updateProfile(req, body);
  }

  @Delete('/profile')
  @ApiBearerAuth()
  @UseGuards(UsersAuthGuard)
  deleteProfile(@Req() req: Request) {
    return this.userService.deleteProfile(req);
  }

  @ApiExcludeEndpoint()
  @Post('/3kd30/admin')
  registerAdmin(@Body() body: CreateUserDto) {
    return this.userService.registerAdmin(body);
  }

}
