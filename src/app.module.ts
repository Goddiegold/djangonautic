/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';

// @Module({
//   imports: [ArticlesModule, TypeOrmModule.forRoot({
//     type: "postgres",
//     host: process.env.DATABASE_HOST,
//     port: +process.env.DATABASE_PORT,
//     username: process.env.DATABASE_USER,
//     password: `${process.env.DATABASE_PASSWORD}`,
//     database: process.env.DATABASE_NAME,
//   })],
//   controllers: [AppController],
//   providers: [AppService],
// })
console.log(
  ""
);
@Module({
  imports: [ArticlesModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "goddy",
    password: `12345`,
    database: "djangonautic-db",
    autoLoadEntities: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
