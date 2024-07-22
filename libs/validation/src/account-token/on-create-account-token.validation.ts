import { AccountToken, AccountTokenDto } from './account-token.validation';

export type OnCreateAccountTokenRequest = AccountToken;

export class OnCreateAccountTokenBodyDto extends AccountTokenDto { }

export type OnCreateAccountTokenResponse = null;
