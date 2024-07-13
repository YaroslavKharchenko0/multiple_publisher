import { Provider } from "@nestjs/common";
import { AccountTokenRepository } from "../repositories/account-token.repository";

export const ACCOUNT_TOKEN_REPOSITORY = 'ACCOUNT_TOKEN_REPOSITORY';

export const accountTokenRepositoryProvider: Provider = {
  provide: ACCOUNT_TOKEN_REPOSITORY,
  useClass: AccountTokenRepository,
}
