import { Cognito, CognitoService } from "@app/aws";
import { Injectable } from "@nestjs/common";
import { Service, SignInParams, SignInReturnParams, SignUpParams } from "./auth.service.interface";

@Injectable()
export class AuthService implements Service {
  constructor(@Cognito() private readonly cognitoService: CognitoService) { }

  async signUp(payload: SignUpParams): Promise<void> {
    await this.cognitoService.signUpByEmail({ password: payload.password, email: payload.email })
  }

  async signIn(payload: SignInParams): Promise<SignInReturnParams> {
    const result = await this.cognitoService.signInByUsername({ email: payload.email, password: payload.password })

    const userAuth = result.AuthenticationResult

    const output: SignInReturnParams = {
      accessToken: userAuth.AccessToken,
      idToken: userAuth.IdToken,
      refreshToken: userAuth.RefreshToken,
      expiresIn: userAuth.ExpiresIn
    }

    return output
  }

}
