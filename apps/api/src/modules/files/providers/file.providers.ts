import { Provider } from "@nestjs/common";
import { FileRepository } from "../repositories/files.repository";

export const FILE_REPOSITORY = 'FILE_REPOSITORY';
export const FILE_SERVICE = 'FILE_SERVICE';

export const fileRepositoryProvider: Provider = {
  provide: FILE_REPOSITORY,
  useClass: FileRepository
}
