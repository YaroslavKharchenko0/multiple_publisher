import { Provider } from "@nestjs/common";
import { FileRepository } from "../repositories/files.repository";
import { FileService } from "../services/files.service";
import { BUNNY_STORAGE_SERVICE, BUNNY_STREAM_SERVICE, BunnyStorageService, BunnyStreamService } from "@app/bunny";
import { RmqErrorService } from "@app/errors";
import { FileFacade } from "@app/utils";

export const FILE_REPOSITORY = 'FILE_REPOSITORY';
export const FILE_SERVICE = 'FILE_SERVICE';

export const fileRepositoryProvider: Provider = {
  provide: FILE_REPOSITORY,
  useClass: FileRepository
}

export const fileServiceProvider: Provider = {
  provide: FILE_SERVICE,
  useFactory: (fileRepository: FileRepository, storage: BunnyStorageService, stream: BunnyStreamService, rmqErrorService: RmqErrorService, fileFacade: FileFacade) => new FileService(fileRepository, storage, stream, rmqErrorService, fileFacade),
  inject: [FILE_REPOSITORY, BUNNY_STORAGE_SERVICE, BUNNY_STREAM_SERVICE, RmqErrorService, FileFacade]
}
