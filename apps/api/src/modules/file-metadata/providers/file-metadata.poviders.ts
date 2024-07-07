import { Provider } from "@nestjs/common";
import { RmqErrorService } from "@app/errors";
import { FileMetadataRepository } from "../repositories/file-metadata.repository";
import { FileMetadataService } from "../services/file-metadata.service";

export const FILE_METADATA_REPOSITORY = 'FILE_METADATA_REPOSITORY';
export const FILE_METADATA_SERVICE = 'FILE_METADATA_SERVICE';

export const fileMetadataRepositoryProvider: Provider = {
  provide: FILE_METADATA_REPOSITORY,
  useClass: FileMetadataRepository
}

export const fileMetadataServiceProvider: Provider = {
  provide: FILE_METADATA_SERVICE,
  useFactory: (fileRepository: FileMetadataRepository, errorService: RmqErrorService) => new FileMetadataService(fileRepository, errorService),
  inject: [FILE_METADATA_REPOSITORY, RmqErrorService]
}
