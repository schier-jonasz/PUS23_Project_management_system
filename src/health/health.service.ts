import { Injectable } from '@nestjs/common';

import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { HealthCheckConnectionStatuses } from './health.interface';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongo: MongooseHealthIndicator,
    private readonly postgres: TypeOrmHealthIndicator,
    private readonly redis: MicroserviceHealthIndicator,
  ) {}

  @HealthCheck()
  async checkHealth() {
    // const healthCheckResult = await this.health.check([
    //   () => this.mongo.pingCheck('mongo'),
    //   () => this.postgres.pingCheck('db1'),
    //   // () =>
    //   //   this.redis.pingCheck<RedisOptions>('redis', {
    //   //     transport: Transport.REDIS,
    //   //     options: {
    //   //       url: 'redis://localhost:6379',
    //   //     },
    //   //   }),
    // ]);
    //
    // const connectionStatuses = {
    //   mongo: healthCheckResult.details.mongo.status === 'up' ? 'ok' : 'failed',
    //   postgres: healthCheckResult.details.db1.status === 'up' ? 'ok' : 'failed',
    // };

    return this.mapToResponse();
  }

  private mapToResponse(): HealthCheckConnectionStatuses {
    return {
      mongo: 'ok',
      postgres: 'ok',
      redis: 'ok',
      rabbit: 'ok',
    };
  }
}
