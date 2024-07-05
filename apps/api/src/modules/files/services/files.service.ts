import { Inject, Injectable } from "@nestjs/common";
import { CreateFileInput, Service } from "./files.service.interface";
import { FileModel } from "../models/file.model";
import { FILE_REPOSITORY } from "../providers/file.providers";
import { FileRepository } from "../repositories/files.repository";
import { Pagination } from "@app/validation";

@Injectable()
export class FileService implements Service {
  constructor(@Inject(FILE_REPOSITORY) private readonly repository: FileRepository) { }
  async createOne(input: CreateFileInput): Promise<FileModel> {
    const entities = await this.repository.createOne(input);

    const [entity] = entities;

    return FileModel.fromEntity(entity);
  }
  async findById(id: number): Promise<FileModel> {
    const entity = await this.repository.findById(id);

    return FileModel.fromEntity(entity);
  }
  async findByProviderId(providerId: string): Promise<FileModel> {
    const entity = await this.repository.findByProviderId(providerId);

    return FileModel.fromEntity(entity);
  }
  async findUserFiles(authorId: number, pagination: Pagination): Promise<FileModel[]> {
    const entities = await this.repository.findUserFiles(authorId, pagination);

    return entities.map(FileModel.fromEntity);
  }
  async updateById(id: number, input: Partial<FileModel>): Promise<FileModel> {
    const entity = await this.updateById(id, input);

    return FileModel.fromEntity(entity);
  }
  async deleteById(id: number, userId?: number): Promise<FileModel> {
    const entities = await this.repository.deleteById(id, userId);

    const [entity] = entities;

    return FileModel.fromEntity(entity);
  }
}
