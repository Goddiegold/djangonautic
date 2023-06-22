/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  comparePasswords,
  generateAuthToken,
  generateHashedPassword,
  validateRequestBody,
} from '../utils/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Account_Type, Request_Body_Type } from 'src/utils/types';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Article } from 'src/articles/entities/article.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) { }

  async registerUser(body: CreateUserDto) {
    const { error } = validateRequestBody(body, Request_Body_Type.CREATE_USER);
    if (error) throw new BadRequestException(error.details[0].message);

    let user = await this.userRepository.findOneBy({ email: body.email });
    if (user) throw new BadRequestException('Email already registered!');

    const password = await generateHashedPassword(body.password);

    user = await this.userRepository.save(
      this.userRepository.create({
        ...body,
        password,
      }),
    );

    const token = this.generateAuthTokenHelper(Account_Type.USER, user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }

  async login(body: LoginUserDto) {
    const { error } = validateRequestBody(body, Request_Body_Type.USER_LOGIN);
    if (error) throw new BadRequestException(error.details[0].message);

    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });
    console.log('login-user', user);

    if (!user) throw new BadRequestException('User not found!');

    const validPassword = await comparePasswords(body.password, user.password);
    if (!validPassword)
      throw new BadRequestException('Incorrect Email or Password!');

    const token = this.generateAuthTokenHelper(
      user.isAdmin ? Account_Type.ADMIN : Account_Type.USER,
      user.id,
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }

  async getUserArticles(req) {
    console.log("userId-->", req.params.userId)
    const user = await this.userRepository.findOneBy({ id: req.params.userId })
    if (!user) throw new Error('User not found!')
    const articles = await this.articleRepository.find({
      where: { author: user },
      relations: ["author"],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
    });
    return articles 
  }

  async getProfile(req) {
    console.log('req-user', req.user.id);
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
      select: ['id', 'name', 'email'],
    });
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async updateProfile(req, body: UpdateUserDto) {
    const { error } = validateRequestBody(
      body,
      Request_Body_Type.UPDATE_PROFILE,
    );
    if (error) throw new BadRequestException(error.details[0].message);

    const password = body.password
      ? await generateHashedPassword(body.password)
      : req.user.password;
    const user = await this.userRepository.save(
      await this.userRepository.preload({
        id: req.user.id,
        ...body,
        password,
      }),
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async deleteProfile(req) {
    const user = await this.userRepository.findOneBy({ id: req.user.id });
    if (!user) throw new NotFoundException('User not found!');
    return this.userRepository.delete(user);
  }

  async registerAdmin(body: CreateUserDto) {
    const { error } = validateRequestBody(body, Request_Body_Type.CREATE_USER);
    if (error) throw new BadRequestException(error.details[0].message);

    const userExists = await this.userRepository.findOneBy({
      email: body.email,
    });
    if (userExists) throw new BadRequestException('Email already registered!');

    const password = await generateHashedPassword(body.password);

    const newUser = await this.userRepository.save(
      this.userRepository.create({
        ...body,
        password,
        isAdmin: true,
      }),
    );

    const token = this.generateAuthTokenHelper(Account_Type.ADMIN, newUser.id);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token,
    };
  }

  async getAllUsers() {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email'],
    });
    return users;
  }

  generateAuthTokenHelper(userType: Account_Type, userId: string) {
    const token = generateAuthToken(userType, userId);
    if (!token)
      throw new InternalServerErrorException(
        "Sorry, this process couldn't be completed!",
      );
    return token;
  }
}
