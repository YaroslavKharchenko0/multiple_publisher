import { Inject, Injectable } from "@nestjs/common";
import { CognitoIdentityProvider, InitiateAuthCommandInput } from '@aws-sdk/client-cognito-identity-provider';
import { SignInByUsername, SignUpByEmailParams } from "./types";
import { COGNITO_CONFIG } from "./constants";
import { CognitoConfig } from "./cognito.config";

@Injectable()
export class CognitoService {
  private cognitoISP: CognitoIdentityProvider;
  private config: CognitoConfig;

  constructor(@Inject(COGNITO_CONFIG) config: CognitoConfig) {
    this.config = config;
    this.cognitoISP = new CognitoIdentityProvider({
      region: config.region,
    });
  }

  async signUpByEmail(params: SignUpByEmailParams) {
    const signUpParams = {
      ClientId: this.config.clientId,
      Username: params.email,
      Password: params.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: params.email,
        },
      ],
    };

    const result = await this.cognitoISP.signUp(signUpParams)

    return result;
  }

  async signInByUsername(params: SignInByUsername) {
    const authParams: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.config.clientId,
      AuthParameters: {
        USERNAME: params.email,
        PASSWORD: params.password,
      },
    };

    const result = await this.cognitoISP.initiateAuth(authParams);
    return result
  }

  async verifyEmail(email: string, code: string) {
    const params = {
      ClientId: this.config.clientId,
      Username: email,
      ConfirmationCode: code,
    };

    const result = await this.cognitoISP.confirmSignUp(params);
    return result;
  }
}
