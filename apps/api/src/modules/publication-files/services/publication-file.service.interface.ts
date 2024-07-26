import { Options } from '@app/types';
import { PublicationFileModel } from '../models/publication-file.model';

export interface Service {
  createPublicationFiles(
    publicationId: number,
    fileIds: number[],
    isOriginal: boolean,
  ): Promise<PublicationFileModel[]>;
  findPublicationFiles(publicationId: number): Promise<PublicationFileModel[]>;
  deletePublicationFiles(
    publicationId: number,
    options: Options,
  ): Promise<PublicationFileModel[]>;
}
