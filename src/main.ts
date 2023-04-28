import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const { AppModule } = await import('./app.module');

  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
}
bootstrap();
