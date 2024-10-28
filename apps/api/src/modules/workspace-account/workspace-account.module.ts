import { RmqModule } from '@app/rmq';
import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { WorkspaceAccountRepository } from './repositories/workspace-account.repository';
import { WorkspaceAccountService } from './services/workspace-account.service';

@Module({})
export class WorkspaceAccountModule {
  static forRoot() {
    return {
      module: WorkspaceAccountModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController],
      providers: [WorkspaceAccountService, WorkspaceAccountRepository],
      exports: [WorkspaceAccountService, WorkspaceAccountRepository],
    };
  }
}
