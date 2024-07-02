import { Role } from "@app/types";

export type SignUpByEmailParams = {
  password: string;
  email: string;
}

export type SignInByUsername = {
  email: string;
  password: string;
}

export type VerifyEmailParams = {
  email: string;
  code: string;
}

export type CognitoJWTUser = {
  sub: string;
  email_verified: boolean;
  email: string;
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
  client_id: string;
  'cognito:username': string;
  'custom:role': Role;
}

export type SetCustomClaimsParams = {
  email: string;
  claims: Record<string, string>;
}

export type DeleteCustomClaims = {
  email: string;
  claims: string[];
}
