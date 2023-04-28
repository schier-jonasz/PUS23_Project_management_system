import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { RedisHealthIndicator } from './indicators/redis-health.indicator';

@Module({
  imports: [TerminusModule, RedisHealthIndicator],
  controllers: [HealthController],
  providers: [HealthService],
  // exports: [HealthService],s
})
export class HealthModule {}
