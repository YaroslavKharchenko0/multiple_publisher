import { ConfigService } from "@nestjs/config";

export type CognitoConfig = {
  userPoolId: string;
  clientId: string;
}

export const createCognitoConfig = (configService: ConfigService): CognitoConfig => {
  const poolConfig = {
    userPoolId: configService.get('COGNITO_USER_POOL_ID'),
    clientId: configService.get('COGNITO_CLIENT_ID'),
  }

  return poolConfig;
}
