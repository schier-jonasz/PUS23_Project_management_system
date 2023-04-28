import { Injectable } from '@nestjs/common';

import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { RedisHealthIndicator } from './indicators/redis-health.indicator';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private mongo: MongooseHealthIndicator,
    private postgres: TypeOrmHealthIndicator,
    private readonly redis: RedisHealthIndicator,
  ) {}

  @HealthCheck()
  async checkHealth() {
    const healthCheckResult = await this.health.check([
      () => this.mongo.pingCheck('mongo'),
      () => this.postgres.pingCheck('db1'),
      () => this.redis.isHealthy('redis'),
    ]);

    console.log({ healthCheckResult });

    const connectionStatuses = {
      mongo: healthCheckResult.details.mongo.status === 'up' ? 'ok' : 'failed',
      postgres: healthCheckResult.details.db1.status === 'up' ? 'ok' : 'failed',
    };

    return connectionStatuses;
  }
}
