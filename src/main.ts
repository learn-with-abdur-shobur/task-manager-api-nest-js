import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Test API')
    .setDescription('The Test API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(env.port);
  console.log('run at=> ' + ((await app.getUrl()) + '/api'));
}
bootstrap();
