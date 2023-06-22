/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  slug: string;

  // @ManyToOne(() => Author, author => author.books)
  @ManyToOne(() => User, (author) => author.articles)
  author: User;
}
