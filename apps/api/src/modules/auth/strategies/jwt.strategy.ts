import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { CognitoJWTUser } from '@app/aws';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const config = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: configService.getOrThrow('COGNITO_CLIENT_ID'),
      issuer: configService.getOrThrow('COGNITO_AUTHORITY'),
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: configService.getOrThrow('COGNITO_JWKS_URI'),
      }),
    }

    super(config);
  }

  public async validate(payload: CognitoJWTUser) {
    return {
      id: payload.sub,
      email: payload.email,
      email_verified: payload.email_verified,
    }
  }
}
