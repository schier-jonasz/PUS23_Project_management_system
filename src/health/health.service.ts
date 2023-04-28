import { Injectable } from '@nestjs/common';

import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { ServiceHealthCheckStatus } from './enums/service-status.enum';
import { ServiceEnum } from './enums/service.enum';
import { HealthIndicatorStatus } from '@nestjs/terminus/dist/health-indicator/health-indicator-result.interface';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    // private readonly redis: MicroserviceHealthIndicator,
    private readonly mongo: MongooseHealthIndicator,
    private readonly postgres: TypeOrmHealthIndicator,
  ) {}

  @HealthCheck()
  async checkHealth() {
    const { info } = await this.health.check([
      () => this.postgres.pingCheck(ServiceEnum.POSTGRES),
      () => this.mongo.pingCheck(ServiceEnum.MONGO_DB),
      // () =>
      //   this.redis.pingCheck<RedisOptions>('redis', {
      //     transport: Transport.REDIS,
      //     options: {
      //       url: 'redis://localhost:6379',
      //     },
      //   }),
    ]);

    console.log(info);

    return {
      mongo: this.getStatusMessage(info[ServiceEnum.MONGO_DB].status),
      postgres: this.getStatusMessage(info[ServiceEnum.POSTGRES].status),
      // redis: this.getStatusMessage(result.info[ServiceEnum.REDIS].status),
      // rabbit: this.getStatusMessage(result.info[ServiceEnum.RABBIT_MQ].status),
    };
  }

  private getStatusMessage(
    status: HealthIndicatorStatus,
  ): ServiceHealthCheckStatus {
    return status === 'up'
      ? ServiceHealthCheckStatus.HEALTHY
      : ServiceHealthCheckStatus.UNHEALTHY;
  }
}
