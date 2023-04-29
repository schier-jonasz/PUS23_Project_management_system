import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  describe('healthcheck', () => {
    it('should return "ok" for each service', () => {
      expect(controller.checkHealth()).toEqual({
        redis: 'ok',
        postgres: 'ok',
        mongo: 'ok',
        rabbit: 'ok',
      });
    });
  });
});
