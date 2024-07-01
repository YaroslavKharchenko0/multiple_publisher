export interface SignUpParams {
  username: string;
  password: string;
  email: string;
}

export interface SignInParams {
  username: string;
  password: string;
}

export interface SignInReturnParams {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export interface Service {
  signUp(payload: SignUpParams): Promise<void>;
  signIn(payload: SignInParams): Promise<SignInReturnParams>;
}
