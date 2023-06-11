/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller("api/users")
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Post("/signup")
  registerUser(@Body() body: CreateUserDto) {
    return this.userService.registerUser(body)
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginUserDto) {
    return this.userService.login(body)
  }

  @Post("/3kd30/admin")
  registerAdmin(@Body() body: CreateUserDto) {
    return this.userService.registerAdmin(body)
  }


}
