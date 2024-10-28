import { Module, Global, DynamicModule } from '@nestjs/common';
import { COGNITO_CONFIG, COGNITO_SERVICE } from './constants';
import { CognitoConfig, createCognitoConfig } from './cognito.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CognitoService } from './cognito.service';

@Global()
@Module({})
export class AWSModule {
  static forRoot(): DynamicModule {
    return {
      module: AWSModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: COGNITO_CONFIG,
          useFactory: createCognitoConfig,
          inject: [ConfigService],
        },
        {
          provide: COGNITO_SERVICE,
          useFactory: (config: CognitoConfig) => {
            return new CognitoService(config);
          },
          inject: [COGNITO_CONFIG],
        },
      ],
      exports: [COGNITO_SERVICE],
    };
  }
}
