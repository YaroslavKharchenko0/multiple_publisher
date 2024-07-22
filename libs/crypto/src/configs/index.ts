import { ConfigService } from '@nestjs/config';
import { JwtServiceParams } from '../interfaces';

export const createJwtConfig = (
  configService: ConfigService,
): JwtServiceParams => {
  const expiresIn = configService.get<string>('JWT_EXPIRES_IN', '1h');

  const baseAlgorithm = 'RS256';

  return {
    tokenVerifyOptions: {
      algorithms: [baseAlgorithm],
      ignoreExpiration: false,
    },
    tokenSignOptions: {
      algorithm: baseAlgorithm,
      expiresIn,
    },
    privateKey: configService.get<string>('JWT_PRIVATE'),
    publicKey: configService.get<string>('JWT_PUBLIC'),
  };
};

export const createJweConfig = (configService: ConfigService): string => {
  return configService.get<string>('JWE_SECRET', '');
};
