import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { EventController } from './controllers/event.controller';

@Module({})
export class ExampleModule {
  static forRoot(): DynamicModule {
    return {
      module: ExampleModule,
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
