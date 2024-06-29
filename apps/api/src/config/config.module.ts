import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { configModuleOptions } from './config';

@Module({})
export class ConfigModule {
  static forRoot() {
    return {
      module: ConfigModule,
      imports: [Config.forRoot(configModuleOptions)],
      controllers: [],
      providers: [],
    };
  }
}
