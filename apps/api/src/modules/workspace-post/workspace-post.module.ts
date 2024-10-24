import { RmqModule } from '@app/rmq';
import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { WorkspacePostService } from './services/workspace-post.service';
import { WorkspacePostRepository } from './repositories/workspace-post.repository';

@Module({})
export class WorkspacePostModule {
  static forRoot() {
    return {
      module: WorkspacePostModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController],
      providers: [WorkspacePostService, WorkspacePostRepository],
      exports: [WorkspacePostService, WorkspacePostRepository],
    };
  }
}
