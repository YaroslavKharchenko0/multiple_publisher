import { Provider } from '@nestjs/common';
import { HashService, JweService, JwtService } from '../services';
import {
  CRYPTO_HASH_SERVICE,
  CRYPTO_JWE_SERVICE,
  CRYPTO_JWT_SERVICE,
  JWE_SERVICE_CONFIG,
  JWT_SERVICE_CONFIG,
} from '../crypto.constants';
import { ConfigService } from '@nestjs/config';
import { createJweConfig, createJwtConfig } from '../configs';
import { JwtServiceParams } from '../interfaces';

export const hashServiceProvider: Provider = {
  provide: CRYPTO_HASH_SERVICE,
  useClass: HashService,
};

export const jwtServiceProvider: Provider = {
  provide: CRYPTO_JWT_SERVICE,
  useFactory: (config: JwtServiceParams) => {
    return new JwtService(config);
  },
  inject: [JWT_SERVICE_CONFIG],
};

export const jweServiceProvider: Provider = {
  provide: CRYPTO_JWE_SERVICE,
  useFactory: (config: string) => {
    return new JweService(config);
  },
  inject: [JWE_SERVICE_CONFIG],
};

export const jwtServiceConfigProvider: Provider = {
  provide: JWT_SERVICE_CONFIG,
  useFactory: createJwtConfig,
  inject: [ConfigService],
};

export const jweServiceConfigProvider: Provider = {
  provide: JWE_SERVICE_CONFIG,
  useFactory: createJweConfig,
  inject: [ConfigService],
};
