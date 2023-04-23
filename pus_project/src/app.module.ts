import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:example@mongo/database_mongo'),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
