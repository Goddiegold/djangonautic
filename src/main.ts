/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Djangonautic - NestJS version')
  .setDescription('Article Writing Application')
  .setVersion('1.0')
  .build();

const swaggerCustomOptions = {
    customCss: '.swagger-ui section.models { visibility: hidden;}'
  };
  

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('docs', app, document,swaggerCustomOptions);


  await app.listen(3000);
}
bootstrap();
