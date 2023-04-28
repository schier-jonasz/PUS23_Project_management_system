import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
    HttpModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
