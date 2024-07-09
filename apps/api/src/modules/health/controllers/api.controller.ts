import { Controller, Get } from "@nestjs/common";
import { TraceId } from "@app/logger";
import { HealthService } from "../services/health.service";

@Controller('health')
export class ApiController {
  constructor(private readonly healthService: HealthService) { }

  @Get('/')
  health(@TraceId() traceId: string | undefined) {
    return this.healthService.getHealth(traceId);
  }
}
