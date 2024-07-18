import { AccessTokenQueue } from '../../queues';
import { AccountToken } from '@app/validation';

export abstract class RefreshTokensJob extends AccessTokenQueue {
  public static readonly jobName = 'access-token.refresh-tokens';

  public static request: AccountToken;

  public static response: null;
}
