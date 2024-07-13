import { Provider } from "@nestjs/common";
import { AccountProviderRepository } from "../repositories/account-provider.repostiory";
import { AccountProviderService } from "../services/account-provider.service";
import { RmqErrorService } from "@app/errors";

export const ACCOUNT_PROVIDER_REPOSITORY = 'ACCOUNT_PROVIDER_REPOSITORY';

export const accountProviderRepositoryProvider: Provider = {
  provide: ACCOUNT_PROVIDER_REPOSITORY,
  useClass: AccountProviderRepository
};

export const ACCOUNT_PROVIDER_SERVICE = 'ACCOUNT_PROVIDER_SERVICE';

export const accountProviderServiceProvider: Provider = {
  provide: ACCOUNT_PROVIDER_SERVICE,
  useFactory: (repository: AccountProviderRepository, rmqErrorService: RmqErrorService) => {
    return new AccountProviderService(repository, rmqErrorService);
  },
  inject: [ACCOUNT_PROVIDER_REPOSITORY, RmqErrorService]
};
