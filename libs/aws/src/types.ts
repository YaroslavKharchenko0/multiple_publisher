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
