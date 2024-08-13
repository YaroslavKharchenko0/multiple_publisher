import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { EventController } from './controllers/event.controller';
import { PublicationRepository } from './repositories/publication.repository';
import { PublicationService } from './services/publication.service';

@Module({})
export class PublicationModule {
  static forRoot(): DynamicModule {
    return {
      module: PublicationModule,
      imports: [RmqModule.forRoot()],
      controllers: [
        ApiController,
        CommandController,
        QueryController,
        EventController,
      ],
      providers: [PublicationRepository, PublicationService],
    };
  }
}
