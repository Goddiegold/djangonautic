/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { slugify, validateRequestBody } from '../utils/user';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { Request_Body_Type } from 'src/utils/types';


@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) { }

    async getArticles() {
        const articles = await this.articleRepository.find()
        return articles
    }

    async getArticle(id: number) {
        const article = await this.articleRepository.findOneBy({ id })
        if (article) return article;
        throw new NotFoundException(`Article #${id} was not found`);
    }

    async addArticle(body) {
        console.log("request-bdoy-->",body)
        const { error } = validateRequestBody(body, Request_Body_Type.CREATE_ARTICLE)
        if (error) throw new BadRequestException(error.details[0].message);

        const article = this.articleRepository.create({
            ...body,
            slug: slugify(body.title)
        })

        return this.articleRepository.save(article)
    }

    async deleteArticle(id: number) {
        const article = await this.articleRepository.findOneBy({ id })
        if (article) return this.articleRepository.remove(article);
        throw new NotFoundException(`Article #${id} was not found`);
    }

    async updateArticle(id: number, body: CreateArticleDto) {
        const article = await this.articleRepository.preload({
            id,
            ...body,
            slug: slugify(body.title)
        });
        if (article) return this.articleRepository.save(article);
        throw new NotFoundException(`Article #${id} was not found`);
    }
}
