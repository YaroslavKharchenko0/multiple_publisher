import { RmqErrorService, RmqResponseService } from '@app/errors';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Provider } from '@nestjs/common';
import { WorkspaceRepository } from '../repositories/workspace.repository';
import { WorkspaceService } from '../services/workspace.service';

export const WORKSPACE_SERVICE = 'WORKSPACE_SERVICE';
export const WORKSPACE_REPOSITORY = 'WORKSPACE_REPOSITORY';

export const workspaceServiceProvider: Provider = {
  provide: WORKSPACE_SERVICE,
  useFactory: (
    repository: WorkspaceRepository,
    amqpConnection: AmqpConnection,
    rmqResponseService: RmqResponseService,
    rmqErrorService: RmqErrorService,
  ) => {
    return new WorkspaceService(
      repository,
      amqpConnection,
      rmqResponseService,
      rmqErrorService,
    );
  },
  inject: [
    WORKSPACE_REPOSITORY,
    AmqpConnection,
    RmqResponseService,
    RmqErrorService,
  ],
};

export const workspaceRepositoryProvider: Provider = {
  provide: WORKSPACE_REPOSITORY,
  useClass: WorkspaceRepository,
};
