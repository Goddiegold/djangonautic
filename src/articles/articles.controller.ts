/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller("api/articles")
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) { }

  @Get()
  getArticles() {
    return this.articleService.getArticles();
  }

  @Get(':id')
  getArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.getArticle(id)
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle(id)
  }

  @Put(':id')
  updateArticle(@Param('id', ParseIntPipe) id: number, @Body() body: CreateArticleDto) {
    return this.articleService.updateArticle(id, body)
  }

  @Post()
  addArticle(@Body() body: CreateArticleDto) {
    return this.articleService.addArticle(body)
  }

}
