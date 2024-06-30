import { Module, Global } from "@nestjs/common";
import { RmqErrorService } from "./rmq-error.service";

@Global()
@Module({
  providers: [RmqErrorService],
  exports: [RmqErrorService]
})
export class RmqErrorModule {
  static forRoot() {
    return {
      module: RmqErrorModule,
    };
  }
}
