/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { slugify, validateRequestBody } from '../common/utils/user';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { Request_Body_Type } from 'src/common/utils/types';
import { UpdateArticleDto } from './dto/update-article.dto';
import { deleteUploadedFile } from './services/upload.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) { }

  async getArticle(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
    });
    console.log(article);
    if (article) return article
    throw new NotFoundException(`Article #${id} was not found`);
  }

  async getArticles() {
    const articles = await this.articleRepository.find({
      relations: ["author"],
      select: {
        author: {
          id: true,
          name: true
        }
      }
    })
    return articles;
  }

  async addArticle(req: any, body) {
    console.log('request-bdoy-->', body);
    console.log('request-file-->', req.file);
    console.log(req.user);
    const { error } = validateRequestBody(
      body,
      Request_Body_Type.CREATE_ARTICLE,
    );
    if (error) throw new BadRequestException(error.details[0].message);

    const article = this.articleRepository.create({
      ...body,
      slug: slugify(body.title),
      author: req.user.id,
      image: req?.file?.path && req.file.path,
      image_id: req?.file?.filename && req.file.filename
    });

    return this.articleRepository.save(article);
  }

  async updateArticle(req, id: string, body: UpdateArticleDto) {

    deleteUploadedFile(req?.file?.path && req.currentArticle.image_id, "image")

    const article = await this.articleRepository.preload({
      id,
      ...body,
      slug: body.title && slugify(body.title),
      image: req?.file?.path && req.file.path,
      image_id: req?.file?.filename && req.file.filename
    });
    return this.articleRepository.save(article)
  }

  async deleteArticle(req, id: string) {
    deleteUploadedFile(req?.currentArticle?.image_id && req.currentArticle.image_id, "image")
    const article = await this.articleRepository.findOneBy({ id });
    return this.articleRepository.remove(article);
  }

}
