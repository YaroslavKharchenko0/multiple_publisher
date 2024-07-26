import { DynamicModule, Global, Module } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { FileFacade } from './file.facade';
import { RmqModule } from '@app/rmq';
import { AccountFacade } from './account.facade';
import { PostFacade } from './post.facade';
import { PublicationFacade } from './publication.facade';

@Module({})
@Global()
export class FacadeModule {
  static forRoot(): DynamicModule {
    return {
      module: FacadeModule,
      imports: [RmqModule.forRoot()],
      providers: [
        FileFacade,
        UserFacade,
        AccountFacade,
        PostFacade,
        PublicationFacade,
      ],
      exports: [
        FileFacade,
        UserFacade,
        AccountFacade,
        PostFacade,
        PublicationFacade,
      ],
      global: true,
    };
  }
}
