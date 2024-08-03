import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import { PublicationProviderRepository } from './repositories/publication-provider.repository';
import { PublicationProviderService } from './services/publication-provider.service';

@Module({})
export class PublicationProviderModule {
  static forRoot(): DynamicModule {
    return {
      module: PublicationProviderModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController],
      providers: [PublicationProviderRepository, PublicationProviderService],
    };
  }
}
