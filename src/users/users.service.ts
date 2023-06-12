/* eslint-disable prettier/prettier */
import { Res } from '@nestjs/common';
import {
    Injectable,
    NotFoundException,
    BadRequestException,
    Inject,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePasswords, generateAuthToken, generateHashedPassword, validateRequestBody } from '../utils/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Account_Type, Request_Body_Type } from 'src/utils/types';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async registerUser(body: CreateUserDto) {
        const { error } = validateRequestBody(body, Request_Body_Type.CREATE_USER)
        if (error) throw new BadRequestException(error.details[0].message);

        let user = await this.userRepository.findOneBy({ email: body.email })
        if (user) throw new BadRequestException('Email already registered!')

        const password = await generateHashedPassword(body.password)

        user = await this.userRepository.save(this.userRepository.create({
            ...body,
            password
        }))

        const token = this.generateAuthTokenHelper(Account_Type.USER, user.id)

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        }
    }


    async registerAdmin(body: CreateUserDto) {
        const { error } = validateRequestBody(body, Request_Body_Type.CREATE_USER)
        if (error) throw new BadRequestException(error.details[0].message);

        const userExists = await this.userRepository.findOneBy({ email: body.email })
        if (userExists) throw new BadRequestException('Email already registered!')

        const password = await generateHashedPassword(body.password)

        const newUser = await this.userRepository.save(this.userRepository.create({
            ...body,
            password,
            isAdmin: true
        }))

        const token = this.generateAuthTokenHelper(Account_Type.ADMIN, newUser.id)

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token
        }
    }


    async login(body: LoginUserDto) {
        const { error } = validateRequestBody(body, Request_Body_Type.USER_LOGIN)
        if (error) throw new BadRequestException(error.details[0].message);

        const user = await this.userRepository.findOne({ where: { email: body.email } })
        console.log("login-user", user)

        if (!user) throw new BadRequestException('User not found!')

        const validPassword = await comparePasswords(body.password, user.password)
        if (!validPassword) throw new BadRequestException('Incorrect Email or Password!')

        const token = this.generateAuthTokenHelper(user.isAdmin ? Account_Type.ADMIN : Account_Type.USER, user.id)


        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.find({})
        return users
    }

    generateAuthTokenHelper(userType: Account_Type, userId: string) {
        const token = generateAuthToken(userType, userId)
        if (!token) throw new InternalServerErrorException("Sorry, this process couldn't be completed!")
        return token
    }


}
