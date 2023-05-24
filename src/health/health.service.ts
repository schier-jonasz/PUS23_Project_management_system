import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  MongooseHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { HealthIndicatorStatus } from '@nestjs/terminus/dist/health-indicator/health-indicator-result.interface';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { RmqOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { ServiceHealthCheckStatus } from './enums/service-status.enum';
import { ServiceEnum } from './enums/service.enum';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly mongo: MongooseHealthIndicator,
    private readonly postgres: TypeOrmHealthIndicator,
  ) {}

  @HealthCheck()
  async checkHealth() {
    const { info } = await this.health.check([
      () => this.postgres.pingCheck(ServiceEnum.POSTGRES),
      () => this.mongo.pingCheck(ServiceEnum.MONGO_DB),
      () =>
        this.microservice.pingCheck<RedisOptions>(ServiceEnum.REDIS, {
          transport: Transport.REDIS,
          options: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
        }),
      () =>
        this.microservice.pingCheck<RmqOptions>(ServiceEnum.RABBIT_MQ, {
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
            ],
          },
        }),
    ]);

    return {
      mongo: this.getStatusMessage(info[ServiceEnum.MONGO_DB].status),
      postgres: this.getStatusMessage(info[ServiceEnum.POSTGRES].status),
      redis: this.getStatusMessage(info[ServiceEnum.REDIS].status),
      rabbit: this.getStatusMessage(info[ServiceEnum.RABBIT_MQ].status),
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
