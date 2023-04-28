import { Module } from '@nestjs/common';
import { RedisHealthIndicator } from './redis-health.indicator';

@Module({
  providers: [RedisHealthIndicator],
  exports: [RedisHealthIndicator],
})
export class HealthIndicatorsModule {}
