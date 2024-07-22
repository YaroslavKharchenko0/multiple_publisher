import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { EventController } from './controllers/event.controller';

@Module({})
export class PostsModule {
  static forRoot(): DynamicModule {
    return {
      module: PostsModule,
      imports: [RmqModule.forRoot()],
      controllers: [
        ApiController,
        CommandController,
        QueryController,
        EventController,
      ],
    };
  }
}
