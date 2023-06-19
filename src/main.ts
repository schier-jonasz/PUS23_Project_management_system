import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { RedisOptions, Transport, RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);

  const {
    REDIS_HOST,
    REDIS_PORT,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_DEFAULT_USER,
    RABBITMQ_DEFAULT_PASS,
    RABBITMQ_QUEUE_NAME,
    RABBITMQ_IS_DURABLE,
    APP_PORT,
  } = process.env;

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.connectMicroservice<RedisOptions>({
    transport: Transport.REDIS,
    options: {
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
    },
  });

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
      ],
      queue: RABBITMQ_QUEUE_NAME,
      queueOptions: {
        durable: RABBITMQ_IS_DURABLE === 'true',
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(APP_PORT);
}
bootstrap();
