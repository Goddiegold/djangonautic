/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';

const jwtService = new JwtService();

async function decodeUser(request,connection) {
  const token = request.headers.authorization && request.headers.authorization.startsWith('Bearer') ?
    request.headers.authorization.split(' ')[1] : null


  if (!token) throw new UnauthorizedException();

  console.log('token', token);
  const decoded = jwtService.verify(token, {
    secret: process.env.PRIVATE_KEY,
  });

  console.log('decoded-user', decoded.id);

  if (!decoded) return false;

  const userRepository: Repository<User> =
    connection.getRepository(User);

  return await userRepository.findOneBy({ id: decoded.id });
}

@Injectable()
export class UsersAuthGuard implements CanActivate {
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
    const user = await decodeUser(request,this.connection)
    if (!user) return false
    return true;
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

  private async isAuthenticated(request): Promise<boolean> {

    const user = await decodeUser(request,this.connection)
    if (!user) return false

    const articleRepository: Repository<Article> =
      this.connection.getRepository(Article);
    console.log('authorized-user--->', user);

    if (!user) throw new NotFoundException('User not found!');

    if (user.isAdmin) return true

    const article = await articleRepository.findOneBy({ id: request.params?.id, author: user });

    if (!article) throw new NotFoundException('Article was not found!');

    request['user'] = user;
    console.log('current article-->', article);
    return true;
  }
}

/** Admin user guard */
@Injectable()
export class AdminAuthGuard implements CanActivate {
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
    const user = await decodeUser(request,this.connection)
    if (!user) throw new NotFoundException('User not found!');
    request['user'] = user;
    return true;
  }
}
