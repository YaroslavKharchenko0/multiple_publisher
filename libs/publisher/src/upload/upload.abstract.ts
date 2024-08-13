import {
  Publication,
  Account,
  AccountToken,
  PublicationProvider,
} from '@app/validation';
import { BlobObject } from '../file-validator/file-validator.abstract';

export interface UploadParams {
  publication: Publication;
  account: Account;
  accountTokens: AccountToken[];
  publicationProvider: PublicationProvider;
  objects: BlobObject[];
}

export abstract class UploadAbstract {
  abstract upload(params: UploadParams): Promise<void>;
}
