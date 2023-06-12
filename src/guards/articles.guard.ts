/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext,NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectConnection} from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';

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
        const user = await userRepository.findOneBy({ id: decoded.id })
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
        const decoded = await jwtService.verifyAsync(token, { secret: process.env.PRIVATE_KEY })
        console.log("decoded-user", decoded.id);
        if (!decoded) return false
        const userRepository: Repository<User> = this.connection.getRepository(User);
        const articleRepository: Repository<Article> = this.connection.getRepository(Article)
        const user = await userRepository.findOneBy({ id: decoded.id })
        console.log("authorized-user--->", user)

        if (!user) throw new NotFoundException('User not found!')

        const article = await articleRepository.findOne({ where: { id: request.params?.id }, relations: ["author"] })

        if (!article) throw new NotFoundException('Article was not found!')

        if (!article.author && !user.isAdmin ||
         !user.isAdmin && article.author
          && article.author?.id !== article.author.id)
           throw new UnauthorizedException()

        if (article && article?.author?.id === user.id || user.isAdmin) return true
        request["user"] = user
        console.log("current article-->", article)

    }
}
