import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('healthcheck', () => {
    it('should return "ok" for each service', () => {
      expect(appController.getHealth()).toEqual({
        redis: 'ok',
        postgres: 'ok',
        mongo: 'ok',
        rabbit: 'ok',
      });
    });
  });
});
