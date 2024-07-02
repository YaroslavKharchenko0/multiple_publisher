import { Cognito, CognitoService } from "@app/aws";
import { Injectable } from "@nestjs/common";
import { Options, Service, SignInParams, SignInReturnParams, SignUpParams, VerifyEmailParams } from "./auth.service.interface";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { SignUpSuccessEvent } from "@app/contracts";

@Injectable()
export class AuthService implements Service {
  constructor(@Cognito() private readonly cognitoService: CognitoService, private readonly amqpConnection: AmqpConnection) { }

  async signUp(payload: SignUpParams, options?: Options): Promise<void> {
    const result = await this.cognitoService.signUpByEmail({ password: payload.password, email: payload.email, attributes: { name: payload?.name, birthDate: payload?.birthDate } })

    const userId = result.UserSub

    const eventMessage: SignUpSuccessEvent.Request = {
      email: payload.email,
      providerId: userId,
      birthDate: payload?.birthDate,
      name: payload?.name
    }

    await this.amqpConnection.publish(SignUpSuccessEvent.exchange, SignUpSuccessEvent.routingKey, eventMessage, { headers: { traceId: options?.traceId } })
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

  async verifyEmail(payload: VerifyEmailParams): Promise<void> {
    await this.cognitoService.verifyEmail({
      email: payload.email,
      code: payload.code
    })
  }

}
