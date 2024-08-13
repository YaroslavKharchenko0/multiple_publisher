import { DynamicModule, Global, Module } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { FileFacade } from './file.facade';
import { RmqModule } from '@app/rmq';
import { AccountFacade } from './account.facade';
import { PostFacade } from './post.facade';
import { PublicationFacade } from './publication.facade';
import { PublicationProviderFacade } from './publication-provider.facade';

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
        PublicationProviderFacade,
      ],
      exports: [
        FileFacade,
        UserFacade,
        AccountFacade,
        PostFacade,
        PublicationFacade,
        PublicationProviderFacade,
      ],
      global: true,
    };
  }
}
