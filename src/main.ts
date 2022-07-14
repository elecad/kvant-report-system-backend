import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validator.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
