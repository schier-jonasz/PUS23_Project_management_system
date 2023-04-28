import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheckConnectionStatuses } from './health.interface';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async checkHealth(): Promise<HealthCheckConnectionStatuses> {
    return await this.healthService.checkHealth();
  }
}
