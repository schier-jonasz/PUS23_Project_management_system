import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @HealthCheck()
  checkHealth() {
    return this.health.check([
      () => this.http.pingCheck('redis', 'redis://redis:6379'),
      () =>
        this.http.pingCheck(
          'postgres',
          'postgres://postgres:postgres@postgres:5432/db1',
        ),
      () =>
        this.http.pingCheck(
          'mongo',
          'mongodb://root:root@mongo:27017/database_mongo',
        ),
      () =>
        this.http.pingCheck('rabbit', 'amqp://rabbitmq:rabbitmq@example:5672'),
    ]);
  }
}
