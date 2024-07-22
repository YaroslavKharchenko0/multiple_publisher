import { Module, Global } from '@nestjs/common';
import { RmqErrorService } from './rmq-error.service';
import { RmqResponseService } from './rmq-response.service';

@Global()
@Module({
  providers: [RmqErrorService, RmqResponseService],
  exports: [RmqErrorService, RmqResponseService],
})
export class RmqErrorModule {
  static forRoot() {
    return {
      module: RmqErrorModule,
    };
  }
}
