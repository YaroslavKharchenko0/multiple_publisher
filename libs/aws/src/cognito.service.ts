import { Inject, Injectable } from "@nestjs/common";
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession, ISignUpResult } from "amazon-cognito-identity-js";
import { SignInByUsername, SignUpByUsernameParams } from "./types";
import { COGNITO_CONFIG } from "./constants";
import { CognitoConfig } from "./cognito.config";

@Injectable()
export class CognitoService {
  private userPool: CognitoUserPool

  constructor(@Inject(COGNITO_CONFIG) config: CognitoConfig) {
    const poolConfig = {
      UserPoolId: config.userPoolId,
      ClientId: config.clientId,
    };

    this.userPool = new CognitoUserPool(poolConfig);
  }

  signUpByUsername(params: SignUpByUsernameParams): Promise<ISignUpResult | undefined> {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(params.username, params.password, [], [], (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  signInByUsername(params: SignInByUsername): Promise<CognitoUserSession> {
    const authenticationData = {
      Username: params.username,
      Password: params.password,
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: params.username,
      Pool: this.userPool,
    }

    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    })
  }

}
