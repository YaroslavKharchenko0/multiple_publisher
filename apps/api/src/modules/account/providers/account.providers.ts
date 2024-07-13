import { Provider } from "@nestjs/common";
import { AccountRepository } from "../repositories/account.repository";
import { AccountService } from "../services/account.service";
import { RmqErrorService } from "@app/errors";
import { AccountFacade } from "@app/utils";

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export const accountRepositoryProvider: Provider = {
  provide: ACCOUNT_REPOSITORY,
  useClass: AccountRepository,
};

export const ACCOUNT_SERVICE = 'ACCOUNT_SERVICE'

export const accountServiceProvider: Provider = {
  provide: ACCOUNT_SERVICE,
  useFactory: (repository: AccountRepository, rmqErrorService: RmqErrorService, accountFacade: AccountFacade) => {
    return new AccountService(repository, rmqErrorService, accountFacade)
  },
  inject: [ACCOUNT_REPOSITORY, RmqErrorService, AccountFacade]
}
