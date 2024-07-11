import { ConfigService } from "@nestjs/config";

export type CognitoConfig = {
  userPoolId: string;
  clientId: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export const createCognitoConfig = (configService: ConfigService): CognitoConfig => {
  const poolConfig = {
    userPoolId: configService.get('COGNITO_USER_POOL_ID'),
    clientId: configService.get('COGNITO_CLIENT_ID'),
    region: configService.get('COGNITO_REGION'),
    accessKeyId: configService.get('COGNITO_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('COGNITO_SECRET_ACCESS_KEY'),
  }

  return poolConfig;
}
