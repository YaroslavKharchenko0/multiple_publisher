import { Inject } from "@nestjs/common";
import { AccountTokenModel } from "../models/account-token.model";
import { CreateTokenParams, Service } from "./account-token.service.interface";
import { ACCOUNT_TOKEN_REPOSITORY } from "../providers/account-token.providers";
import { AccountTokenRepository } from "../repositories/account-token.repository";
import { RmqErrorService } from "@app/errors";

export class AccountTokenService implements Service {
  constructor(@Inject(ACCOUNT_TOKEN_REPOSITORY) private readonly repository: AccountTokenRepository, private readonly rmqErrorService: RmqErrorService) { }
  async createToken(params: CreateTokenParams): Promise<AccountTokenModel> {
    const { accountId, token, type } = params;

    const entities = await this.repository.createOne({ accountId, type, token });

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountTokenModel.fromEntity(entity);
  }
  async deleteTokens(accountId: number): Promise<AccountTokenModel[]> {
    const entities = await this.repository.deleteByAccountId(accountId);

    return entities.map(AccountTokenModel.fromEntity);
  }
  async getTokens(accountId: number): Promise<AccountTokenModel[]> {
    const entities = await this.repository.findByAccountId(accountId);

    return entities.map(AccountTokenModel.fromEntity);
  }
}
