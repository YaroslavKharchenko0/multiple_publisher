import { Options } from "@app/types";

export interface SignUpParams {
  email: string;
  password: string;
  name?: string;
  birthDate?: Date;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface AuthenticatedTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface VerifyEmailParams {
  email: string;
  code: string;
}

export interface SignOutParams {
  accessToken: string;
}

export interface KeepSessionParams {
  refreshToken: string;
}

export interface Service {
  signUp(payload: SignUpParams, options?: Options): Promise<void>;
  signIn(payload: SignInParams): Promise<AuthenticatedTokens>;
  verifyEmail(params: VerifyEmailParams): Promise<void>;
  signOut(params: SignOutParams): Promise<void>;
  keepSession(params: KeepSessionParams): Promise<AuthenticatedTokens>;
}
