/* eslint-disable prettier/prettier */
import { Article } from 'src/articles/entities/article.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';



@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  // @OneToMany(() => Book, book => book.author)
  // books: Book[];

  @OneToMany(() => Article, article => article.author)
  articles: Article[]
}