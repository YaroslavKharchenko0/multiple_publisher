import {
  CreateAccountTokenCommand,
  DeleteAccountTokensCommand,
  FindAccountProviderQuery,
  FindAccountQuery,
  SuccessResponse,
} from '@app/contracts';
import { AccountTokenType, ProviderKey } from '@app/types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

interface Options {
  traceId?: string;
}
export interface AccountTokens {
  accessToken?: string;
  refreshToken?: string;
}

@Injectable()
export class AccountFacade {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  async findAccountById(id: number, traceId?: string) {
    const payload: FindAccountQuery.Request = {
      id,
    };

    const accountResponse =
      await this.amqpConnection.request<FindAccountQuery.Response>({
        exchange: FindAccountQuery.exchange,
        routingKey: FindAccountQuery.routingKey,
        payload,
        headers: {
          traceId,
        },
      });

    if (accountResponse.isError) {
      return null;
    }

    const successResponse =
      accountResponse as SuccessResponse<FindAccountQuery.ResponsePayload>;

    return successResponse.payload;
  }

  async findByKey(key: ProviderKey, traceId?: string) {
    const payload: FindAccountProviderQuery.Request = {
      key,
    };

    const accountResponse =
      await this.amqpConnection.request<FindAccountProviderQuery.Response>({
        exchange: FindAccountProviderQuery.exchange,
        routingKey: FindAccountProviderQuery.routingKey,
        payload,
        headers: {
          traceId,
        },
      });

    if (accountResponse.isError) {
      return null;
    }

    const successResponse =
      accountResponse as SuccessResponse<FindAccountProviderQuery.ResponsePayload>;

    return successResponse.payload;
  }

  async deleteAccountTokens(
    accountId: number,
    options?: Options,
  ): Promise<void> {
    const payload: DeleteAccountTokensCommand.Request = {
      accountId,
    };

    await this.amqpConnection.request<DeleteAccountTokensCommand.Response>({
      exchange: DeleteAccountTokensCommand.exchange,
      routingKey: DeleteAccountTokensCommand.routingKey,
      payload,
      headers: {
        traceId: options?.traceId,
      },
    });
  }

  async createAccountTokens(
    accountId: number,
    accountTokens: AccountTokens | null,
    options?: Options,
  ) {
    const tokens = [];

    if (accountTokens?.accessToken) {
      tokens.push({
        accountId,
        token: accountTokens.accessToken,
        type: AccountTokenType.ACCESS,
      });
    }

    if (accountTokens?.refreshToken) {
      tokens.push({
        accountId,
        token: accountTokens.refreshToken,
        type: AccountTokenType.REFRESH,
      });
    }

    const promises = tokens.map((payload) => {
      return this.amqpConnection.request<CreateAccountTokenCommand.Response>({
        exchange: CreateAccountTokenCommand.exchange,
        routingKey: CreateAccountTokenCommand.routingKey,
        payload,
        headers: {
          traceId: options?.traceId,
        },
      });
    });

    await Promise.all(promises);
  }
}
