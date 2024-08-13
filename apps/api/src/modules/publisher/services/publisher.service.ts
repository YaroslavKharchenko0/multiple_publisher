import {
  BlobObject,
  BunnyProvider,
  ProviderAbstract,
  PublisherAbstract,
  UploadFactory,
  UploadParams,
} from '@app/publisher';
import { Options, PublicationStatus } from '@app/types';
import {
  Publication,
  File,
  PublicationProvider,
  Account,
  AccountToken,
} from '@app/validation';
import { Injectable, Logger } from '@nestjs/common';
import {
  AccountFacade,
  PublicationFacade,
  PublicationProviderFacade,
} from '@app/utils';
import {
  BunnyStorage,
  BunnyStorageService,
  BunnyStream,
  BunnyStreamService,
} from '@app/bunny';

@Injectable()
export class PublisherService extends PublisherAbstract {
  private readonly logger = new Logger(PublisherService.name);
  private readonly provider: ProviderAbstract;

  constructor(
    private readonly publicationFacade: PublicationFacade,
    private readonly accountFacade: AccountFacade,
    private readonly publicationProviderFacade: PublicationProviderFacade,
    @BunnyStorage() private readonly storage: BunnyStorageService,
    @BunnyStream() private readonly stream: BunnyStreamService,
  ) {
    super();

    this.provider = new BunnyProvider({
      storage: this.storage,
      stream: this.stream,
    });
  }
  updatePublicationStatus(
    publicationId: number,
    status: PublicationStatus,
    options: Options,
  ): Promise<void> {
    return this.publicationFacade.updatePublicationById(
      publicationId,
      {
        status,
      },
      options,
    );
  }

  private async createBlobObject(file: File): Promise<BlobObject> {
    const fileConfig = await this.provider.createFileConfig(file);

    return {
      file,
      config: fileConfig,
    };
  }

  createBlobObjects(files: File[]): Promise<BlobObject[]> {
    const promises = files.map((file) => this.createBlobObject(file));

    return Promise.all(promises);
  }

  findPublication(
    publicationId: number,
    options: Options,
  ): Promise<Publication | null> {
    return this.publicationFacade.findPublicationById(
      publicationId,
      options?.traceId,
    );
  }
  findPublicationFiles(
    publicationId: number,
    options: Options,
  ): Promise<File[]> {
    return this.publicationFacade.findPublicationFiles(
      publicationId,
      options?.traceId,
    );
  }
  findPublicationProvider(
    providerId: number,
    options: Options,
  ): Promise<PublicationProvider | null> {
    return this.publicationProviderFacade.findPublicationProviderById(
      providerId,
      options,
    );
  }
  findAccount(accountId: number, options: Options): Promise<Account | null> {
    return this.accountFacade.findAccountById(accountId, options?.traceId);
  }
  findAccountTokens(
    account: Account,
    options: Options,
  ): Promise<AccountToken[]> {
    return this.accountFacade.findAccountTokensById(account.id, options);
  }
  upload(params: UploadParams, options: Options): Promise<void> {
    try {
      this.logger.log(`Uploading publication ${params.publication.id}`, {
        traceId: options?.traceId,
      });

      const uploadMaster = UploadFactory.createUpload(
        params.publicationProvider.key,
      );

      return uploadMaster.upload(params);
    } catch (error) {
      this.logger.error(
        `Failed to upload publication ${params.publication.id}, message: ${error?.message}`,
        {
          traceId: options?.traceId,
        },
      );
      throw error;
    }
  }
}
