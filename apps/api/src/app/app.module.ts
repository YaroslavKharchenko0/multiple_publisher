import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';

@Module({})
export class AppModule {
  static forRoot() {
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot()],
      controllers: [],
      providers: [],
    };
  }
}
