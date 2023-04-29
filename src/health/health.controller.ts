import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheckConnectionStatuses } from './interfaces/health.interface';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async checkHealth(): Promise<HealthCheckConnectionStatuses> {
    return await this.healthService.checkHealth();
  }
}
