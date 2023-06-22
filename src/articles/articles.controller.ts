/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common/decorators';
import { ArticleOwnerGuard, UsersAuthGuard } from 'src/guards/users.guard';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) { }

  @Get()
  getArticles() {
    return this.articleService.getArticles();
  }

  @Post()
  @UseGuards(UsersAuthGuard)
  addArticle(@Req() req: Request, @Body() body: CreateArticleDto) {
    return this.articleService.addArticle(req, body);
  }

  @Get(':id')
  getArticle(@Param('id') id: string) {
    return this.articleService.getArticle(id);
  }

  @Put(':id')
  @UseGuards(ArticleOwnerGuard)
  updateArticle(@Param('id') id: string, @Body() body: UpdateArticleDto) {
    return this.articleService.updateArticle(id, body);
  }

  @Delete(':id')
  @UseGuards(ArticleOwnerGuard)
  deleteArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(id);
  }


}
