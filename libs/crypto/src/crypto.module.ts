import { Module } from '@nestjs/common';
import {
  hashServiceProvider,
  jweServiceConfigProvider,
  jweServiceProvider,
  jwtServiceConfigProvider,
  jwtServiceProvider,
} from './providers';

@Module({})
export class CryptoModule {
  static forRoot() {
    return {
      module: CryptoModule,
      providers: [
        hashServiceProvider,
        jwtServiceProvider,
        jweServiceProvider,
        jwtServiceConfigProvider,
        jweServiceConfigProvider,
      ],
    };
  }
}
