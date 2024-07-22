import { AccountTokenQueue, RefreshTokensJob } from '@app/jobs';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ACCOUNT_TOKEN_SERVICE } from '../providers/account-token.providers';
import { AccountTokenService } from '../services/account-token.service';
import { AccountFacade, AccountTokens, convertArrayToMap } from '@app/utils';
import { GcpAuth, GoogleAuthService } from '@app/gcp';
import { AccountTokenType } from '@app/types';

@Processor(AccountTokenQueue.queueName)
export class RefreshTokenProcessor extends WorkerHost {
  private readonly logger = new Logger(RefreshTokenProcessor.name);

  constructor(
    @Inject(ACCOUNT_TOKEN_SERVICE)
    private readonly accountTokenService: AccountTokenService,
    @GcpAuth() private readonly googleAuthService: GoogleAuthService,
    private readonly accountFacade: AccountFacade,
  ) {
    super();
  }

  async process(
    job: Job<
      typeof RefreshTokensJob.request,
      Promise<typeof RefreshTokensJob.response>,
      string
    >,
  ) {
    try {
      this.logger.log(`Processing ${job.name}, job id: ${job.id}`);

      const { data } = job;

      const { accountId } = data;

      const accountTokens = await this.accountTokenService.getTokens(accountId);

      if (!accountTokens) {
        return null;
      }

      const tokenMap = convertArrayToMap({
        array: accountTokens,
        getId: (token) => token.type,
      });

      const refreshedTokens = await this.googleAuthService.refreshTokens({
        accessToken: tokenMap.get(AccountTokenType.ACCESS)?.token,
        refreshToken: tokenMap.get(AccountTokenType.REFRESH)?.token,
      });

      const nextAccountTokens: AccountTokens = {
        accessToken: refreshedTokens.access_token,
        refreshToken: refreshedTokens.refresh_token,
      };

      const traceId = `[JOB]-refresh-tokens-${job.id}`;

      await this.accountFacade.deleteAccountTokens(accountId, { traceId });

      await this.accountFacade.createAccountTokens(
        accountId,
        nextAccountTokens,
        { traceId },
      );

      return null;
    } catch (error) {
      this.logger.error(`Failed to process ${job.name}, job id: ${job.id}`);
      throw error;
    }
  }
}
