import { Provider } from "@nestjs/common";
import { FileRepository } from "../repositories/files.repository";
import { FileService } from "../services/files.service";

export const FILE_REPOSITORY = 'FILE_REPOSITORY';
export const FILE_SERVICE = 'FILE_SERVICE';

export const fileRepositoryProvider: Provider = {
  provide: FILE_REPOSITORY,
  useClass: FileRepository
}

export const fileServiceProvider: Provider = {
  provide: FILE_SERVICE,
  useFactory: (fileRepository: FileRepository) => new FileService(fileRepository),
  inject: [FILE_REPOSITORY]
}
