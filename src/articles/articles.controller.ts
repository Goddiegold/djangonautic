/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Request } from 'express';
import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ArticleOwnerGuard, UsersAuthGuard } from 'src/common/guards/users.guard';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Articles')
@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) { }

  @Get()
  getArticles() {
    return this.articleService.getArticles();
  }

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(UsersAuthGuard)
  addArticle(@Req() req: Request,
    @Body() body: CreateArticleDto,
    @UploadedFile() uploadedImgfile
  ) {
    console.log("Article--uploadedFile->", uploadedImgfile)
    req["file"] = uploadedImgfile
    return this.articleService.addArticle(req, body);
  }

  @Get(':id')
  getArticle(@Param('id') id: string) {
    return this.articleService.getArticle(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(ArticleOwnerGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  updateArticle(@Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateArticleDto,
    @UploadedFile() uploadedImgfile
  ) {
    req["file"] = uploadedImgfile
    return this.articleService.updateArticle(req, id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(ArticleOwnerGuard)
  deleteArticle(
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    return this.articleService.deleteArticle(req, id);
  }


}
