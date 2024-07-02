import { Inject, Injectable } from "@nestjs/common";
import { AdminDeleteUserAttributesCommandInput, AttributeType, AuthFlowType, CognitoIdentityProvider, InitiateAuthCommandInput } from '@aws-sdk/client-cognito-identity-provider';
import { DeleteCustomClaims, SetCustomClaimsParams, SignInByUsername, SignUpByEmailParams, VerifyEmailParams } from "./types";
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
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.config.clientId,
      AuthParameters: {
        USERNAME: params.email,
        PASSWORD: params.password,
      },
    };

    const result = await this.cognitoISP.initiateAuth(authParams);
    return result
  }

  async verifyEmail(params: VerifyEmailParams) {
    const { email, code } = params;

    const confirmSignUpParams = {
      ClientId: this.config.clientId,
      Username: email,
      ConfirmationCode: code,
    };

    const result = await this.cognitoISP.confirmSignUp(confirmSignUpParams);
    return result;
  }

  async setCustomClaims(params: SetCustomClaimsParams) {
    const { email, claims } = params;

    const userAttributes: AttributeType[] = Object.entries(claims).map(([key, value]) => ({
      Name: `custom:${key}`,
      Value: value,
    }));

    const updateUserParams = {
      UserPoolId: this.config.userPoolId,
      Username: email,
      UserAttributes: userAttributes,
    };

    const result = await this.cognitoISP.adminUpdateUserAttributes(updateUserParams);
    return result;
  }

  async deleteCustomClaims(params: DeleteCustomClaims) {
    const { email, claims } = params;

    const names = claims.map((key) => `custom:${key}`);

    const deleteParams: AdminDeleteUserAttributesCommandInput = {
      UserPoolId: this.config.userPoolId,
      Username: email,
      UserAttributeNames: names,
    };

    const result = await this.cognitoISP.adminDeleteUserAttributes(deleteParams);

    return result;
  }
}
