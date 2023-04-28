export interface HealthCheckConnectionStatuses {
  mongo: string;
  postgres: string;
  redis?: string;
  rabbit?: string;
}
