
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

export interface SignInReturnParams {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface VerifyEmailParams {
  email: string;
  code: string;
}

export type Options = {
  traceId: string
}

export interface Service {
  signUp(payload: SignUpParams, options?: Options): Promise<void>;
  signIn(payload: SignInParams): Promise<SignInReturnParams>;
  verifyEmail(params: VerifyEmailParams): Promise<void>;
}
