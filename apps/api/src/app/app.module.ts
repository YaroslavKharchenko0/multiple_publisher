import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { ExampleModule } from '../modules/example/example.module';

@Module({})
export class AppModule {
  static forRoot() {
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot(), ExampleModule.forRoot()],
      controllers: [],
      providers: [],
    };
  }
}
