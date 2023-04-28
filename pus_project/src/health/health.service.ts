import { Injectable } from '@nestjs/common';

import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongo: MongooseHealthIndicator,
    private orm: TypeOrmHealthIndicator,
  ) {}

  @HealthCheck()
  async checkHealth() {
    const healthCheckResult = await this.health.check([
      // () =>
      () => this.mongo.pingCheck('mongo'),
      () => this.orm.pingCheck('db1'),
      //   this.tcp.pingCheck(
      //     'mongo',
      //     'mongodb://root:example@mongo:27017/database_mongo',
      //   ),
      // () => this.tcp.pingCheck('redis', { host: 'redis', port: 6379 }),
      // () =>
      //   this.http.pingCheck(
      //     'postgres',
      //     'postgres://postgres:postgres@postgres:5432/db1',
      //   ),
      // () =>
      //   this.redis.pingCheck<RedisOptions>('redis', {
      //     transport: Transport.REDIS,
      //     options: {
      //       url: 'redis://localhost:6379',
      //     },
      //   }),
      // () => this.postgres.pingCheck('library'),
      // () =>
      //   this.http.pingCheck('rabbit', 'amqp://rabbitmq:rabbitmq@example:5672'),
    ]);
    const connectionStatuses = {
      mongo: healthCheckResult.details.mongo.status === 'up' ? 'ok' : 'failed',
      postgres: healthCheckResult.details.db1.status === 'up' ? 'ok' : 'failed',
    };

    return connectionStatuses;
  }
}
