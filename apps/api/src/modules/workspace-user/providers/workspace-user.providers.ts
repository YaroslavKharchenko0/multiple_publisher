import { Provider } from "@nestjs/common";
import { WorkspaceUserRepository } from "../repositories/workspace-user.repository";
import { WorkspaceUserService } from "../services/workspace-user.service";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { RmqErrorService, RmqResponseService } from "@app/errors";

export const WORKSPACE_USER_REPOSITORY = 'WORKSPACE_USER_REPOSITORY';
export const WORKSPACE_USER_SERVICE = 'WORKSPACE_USER_SERVICE';

export const workspaceUserRepositoryProvider: Provider = {
  provide: WORKSPACE_USER_REPOSITORY,
  useValue: WorkspaceUserRepository
}

export const workspaceUserServiceProvider: Provider = {
  provide: WORKSPACE_USER_SERVICE,
  useFactory: (repository: WorkspaceUserRepository, amqpConnection: AmqpConnection, rmqResponseService: RmqResponseService, rmqErrorService: RmqErrorService) => {
    return new WorkspaceUserService(repository, amqpConnection, rmqResponseService, rmqErrorService);
  },
  inject: [WORKSPACE_USER_REPOSITORY, AmqpConnection, RmqResponseService, RmqErrorService]
}
