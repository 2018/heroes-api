import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from './exceptions/http-exception.filter';
import {API_PORT} from './app.constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    await app.listen(API_PORT);
}
bootstrap();
