import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SERVER_PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);
}
bootstrap();
