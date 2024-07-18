import { AccountTokenQueue } from '../../queues';
import { AccountToken } from '@app/validation';

export abstract class RefreshTokensJob extends AccountTokenQueue {
  public static readonly jobName = 'access-token.refresh-tokens';

  public static request: AccountToken;

  public static response: null;

  public static options = {
    delay: 45 * 60 * 1000,
    removeOnComplete: true,
    attempts: 3,
  };
}
