/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { Connection, getRepository, Not, Repository } from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { Request } from 'express';

const jwtService = new JwtService()

@Injectable()
export class ArticlesAuthGuard implements CanActivate {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.isAuthenticated(request);
    }

    private async isAuthenticated(request: any): Promise<boolean> {
        const token = request.headers["auth-token"]
        if (!token) throw new UnauthorizedException()
        console.log("token", token);
        const decoded = jwtService.verify(token, { secret: process.env.PRIVATE_KEY })
        console.log("decoded-user", decoded);
        if (!decoded) return false
        const userRepository: Repository<User> = this.connection.getRepository(User);
        const user = await userRepository
            .createQueryBuilder('user')
            .select("user.id", decoded.id)
            .addSelect(["user.id", "user.email"])
            .getOne()
        console.log("authorized-user-->", user)

        if (!user) throw new NotFoundException('User not found!')
        request["user"] = user
        return true
    }
}



@Injectable()
export class ArticleOwnerGuard implements CanActivate {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.isAuthenticated(request);
    }

    private async isAuthenticated(request: any): Promise<boolean> {
        const token: any = request.headers["auth-token"]
        if (!token) throw new UnauthorizedException()
        console.log("token", token);
        const decoded = jwtService.verify(token, { secret: process.env.PRIVATE_KEY })
        console.log("decoded-user", decoded);
        if (!decoded) return false
        const userRepository: Repository<User> = this.connection.getRepository(User);
        const articleRepository: Repository<Article> = this.connection.getRepository(Article)
        const user = await userRepository
            .createQueryBuilder('user')
            .select("user.id", decoded.id)
            .addSelect(["user.id", "user.email"])
            .getOne()
        console.log("authorized-user-->", user)

        if (!user) throw new NotFoundException('User not found!')
        request["user"] = user

        const article = await articleRepository.findOne({ where: { id: request.params?.id }, relations: ["author"] })
        if (!article) throw new NotFoundException('Article was not found!')
        if (!article.author) return false
        if (article && article.author.id === user.id || user.isAdmin) return true
        console.log("current article-->", article)

    }
}
