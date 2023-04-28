import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
const Redis = require('ioredis');

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  private redis: typeof Redis;

  constructor() {
    super();
    this.redis = new Redis(6379, 'localhost');
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = this.redis.status === 'ready';
    const result = this.getStatus(key, isHealthy);

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError('Redis check failed', result);
  }
}
