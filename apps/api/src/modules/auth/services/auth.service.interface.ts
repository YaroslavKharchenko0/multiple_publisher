export interface SignUpParams {
  email: string;
  password: string;
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

export interface Service {
  signUp(payload: SignUpParams): Promise<void>;
  signIn(payload: SignInParams): Promise<SignInReturnParams>;
}
