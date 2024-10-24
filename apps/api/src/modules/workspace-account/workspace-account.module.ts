import { RmqModule } from '@app/rmq';
import { Module } from '@nestjs/common';

@Module({})
export class WorkspaceAccountModule {
  static forRoot() {
    return {
      module: WorkspaceAccountModule,
      imports: [RmqModule.forRoot()],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
