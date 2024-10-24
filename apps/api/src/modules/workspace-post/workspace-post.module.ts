import { RmqModule } from '@app/rmq';
import { Module } from '@nestjs/common';

@Module({})
export class WorkspacePostModule {
  static forRoot() {
    return {
      module: WorkspacePostModule,
      imports: [RmqModule.forRoot()],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
