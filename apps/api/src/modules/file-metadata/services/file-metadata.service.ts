import { RmqErrorService } from "@app/errors";
import { Pagination } from "@app/validation";
import { FileMetadataModel } from "../models/file-metadata.model";
import { FileMetadataRepository } from "../repositories/file-metadata.repository";
import { CreateMetadata, Service } from "./file-metadata.service.interface";
import { FILE_METADATA_REPOSITORY } from "../providers/file-metadata.poviders";
import { Inject } from "@nestjs/common";

export class FileMetadataService implements Service {
  constructor(@Inject(FILE_METADATA_REPOSITORY) private readonly fileMetadataRepository: FileMetadataRepository, private readonly exceptionService: RmqErrorService) { }

  async createOne(input: CreateMetadata): Promise<FileMetadataModel> {
    const entities = await this.fileMetadataRepository.createOne(input);

    const [entity] = entities;

    if (!entity) {
      throw this.exceptionService.notFound();
    }

    return FileMetadataModel.fromEntity(entity);
  }

  async findByFileId(id: number, pagination: Pagination): Promise<FileMetadataModel[]> {
    const entities = await this.fileMetadataRepository.findByFile(id, pagination);

    return entities.map(FileMetadataModel.fromEntity);
  }

  async deleteById(id: number): Promise<FileMetadataModel> {
    const entities = await this.fileMetadataRepository.deleteById(id);

    const [entity] = entities;

    if (!entity) {
      throw this.exceptionService.notFound()
    }

    return FileMetadataModel.fromEntity(entity);
  }
}
