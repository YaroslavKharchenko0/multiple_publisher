import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { AdminApiController } from './controllers/admin-api.controller';
import {
  userRoleServiceProvider,
  userRoleRepositoryProvider,
  USER_ROLE_REPOSITORY,
  USER_ROLE_SERVICE,
} from './providers/user-role.providers';
import { AWSModule } from '@app/aws';

@Module({})
export class UserRoleModule {
  static forRoot(): DynamicModule {
    return {
      module: UserRoleModule,
      imports: [RmqModule.forRoot(), AWSModule.forRoot()],
      controllers: [AdminApiController, CommandController, QueryController],
      providers: [userRoleServiceProvider, userRoleRepositoryProvider],
      exports: [USER_ROLE_SERVICE, USER_ROLE_REPOSITORY],
    };
  }
}
