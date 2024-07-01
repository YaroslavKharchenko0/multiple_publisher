import { Cognito, CognitoService } from "@app/aws";
import { Injectable } from "@nestjs/common";
import { Service, SignInParams, SignInReturnParams, SignUpParams } from "./auth.service.interface";

@Injectable()
export class AuthService implements Service {
  constructor(@Cognito() private readonly cognitoService: CognitoService) { }

  async signUp(payload: SignUpParams): Promise<void> {
    await this.cognitoService.signUpByEmail({ username: payload.username, password: payload.password, email: payload.email })
  }

  async signIn(payload: SignInParams): Promise<SignInReturnParams> {
    const userSession = await this.cognitoService.signInByUsername({ username: payload.username, password: payload.password })

    const output: SignInReturnParams = {
      accessToken: userSession.getAccessToken().getJwtToken(),
      idToken: userSession.getIdToken().getJwtToken(),
      refreshToken: userSession.getRefreshToken().getToken(),
    }

    return output
  }

}
