import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb://root:example@mongo:27017/database_mongo?tls=false&ssl=false&authSource=admin',
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres', // match the container name in docker-compose file
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HealthModule,
  ],
})
export class AppModule {}
