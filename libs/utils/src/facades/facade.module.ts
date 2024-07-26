import { DynamicModule, Global, Module } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { FileFacade } from './file.facade';
import { RmqModule } from '@app/rmq';
import { AccountFacade } from './account.facade';
import { PostFacade } from './post.facade';

@Module({})
@Global()
export class FacadeModule {
  static forRoot(): DynamicModule {
    return {
      module: FacadeModule,
      imports: [RmqModule.forRoot()],
      providers: [FileFacade, UserFacade, AccountFacade, PostFacade],
      exports: [FileFacade, UserFacade, AccountFacade, PostFacade],
      global: true,
    };
  }
}
