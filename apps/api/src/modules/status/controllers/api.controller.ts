import { Controller, Get } from '@nestjs/common';
import { TraceId } from '@app/logger';
import { StatusService } from '../services/status.service';

@Controller('')
export class ApiController {
  constructor(private readonly statusService: StatusService) {}

  @Get('/health')
  health(@TraceId() traceId: string | undefined) {
    return this.statusService.getHealth(traceId);
  }

  @Get()
  status() {
    return this.statusService.getStatus();
  }
}
