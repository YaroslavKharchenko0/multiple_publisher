import { AccountStatus } from '@app/types';
import {
  Account,
  AccountToken,
  File,
  Publication,
  PublicationProvider,
} from '@app/validation';
import { FileValidatorFactory } from '../file-validator/file-validator.factory';
import { TextValidatorFactory } from '../text-validator/text-validator.factory';
import { UploadParams } from '../upload/upload.abstract';
import { BlobObject } from '../file-validator/file-validator.abstract';

export abstract class PublisherAbstract {
  abstract findPublication(publicationId: number): Promise<Publication | null>;

  abstract findPublicationFiles(publicationId: number): Promise<File[]>;

  abstract createBlobObjects(files: File[]): Promise<BlobObject[]>;

  abstract findPublicationProvider(
    providerId: number,
  ): Promise<PublicationProvider | null>;

  abstract findAccount(accountId: number): Promise<Account | null>;

  validateAccountProvider(
    account: Account,
    publicationProvider: PublicationProvider,
  ) {
    const isSameProvider =
      account.providerId === publicationProvider.accountProviderId;

    return isSameProvider;
  }

  validateAccount(account: Account) {
    const isActive = account.status === AccountStatus.ACTIVE;

    return isActive;
  }

  abstract findAccountTokens(account: Account): Promise<AccountToken[]>;

  abstract upload(params: UploadParams): Promise<void>;

  async publish(publicationId: number): Promise<void> {
    const publication = await this.findPublication(publicationId);

    if (!publication) {
      throw new Error('Publication not found');
    }

    const publicationProvider = await this.findPublicationProvider(
      publication.publicationProviderId,
    );

    if (!publicationProvider) {
      throw new Error('Publication provider not found');
    }

    const textValidator = TextValidatorFactory.createValidator(
      publicationProvider.key,
    );

    const isValidText = textValidator.validateText({
      title: publication.title,
      description: publication.description,
    });

    if (!isValidText) {
      throw new Error('Invalid title or description');
    }

    const account = await this.findAccount(publication.accountId);

    if (!account) {
      throw new Error('Account not found');
    }

    if (!this.validateAccount(account)) {
      throw new Error('Account is not active');
    }

    if (!this.validateAccountProvider(account, publicationProvider)) {
      throw new Error('Account provider mismatch');
    }

    const files = await this.findPublicationFiles(publicationId);

    const validator = FileValidatorFactory.createValidator(
      publicationProvider.key,
    );

    const blobObjects = await this.createBlobObjects(files);

    const validBlobObjects = validator.validFiles(blobObjects);

    const isValidObjects = validator.validateFiles(validBlobObjects);

    if (!isValidObjects) {
      throw new Error('Invalid files');
    }

    const accountTokens = await this.findAccountTokens(account);

    await this.upload({
      publication,
      account,
      accountTokens,
      publicationProvider,
      objects: validBlobObjects,
    });
  }
}
