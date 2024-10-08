import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logInterceptor } from './interceptors/interceptors';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new logInterceptor());
  
  
  await app.listen(3085);
  
}
bootstrap();
