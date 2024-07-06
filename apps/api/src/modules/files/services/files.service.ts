import { Inject, Injectable } from "@nestjs/common";
import { CreateFileInput, GenerateVideoSignatureParams, GenerateVideoSignatureReturn, Service, UploadFileInput } from "./files.service.interface";
import { FileModel } from "../models/file.model";
import { FILE_REPOSITORY } from "../providers/file.providers";
import { FileRepository } from "../repositories/files.repository";
import { Pagination } from "@app/validation";
import { BunnyStorage, BunnyStorageService, BunnyStream, BunnyStreamService } from "@app/bunny";
import { format } from "date-fns";
import { FileType, UploadStatus } from "@app/types";
import { randomUUID } from "crypto";
import { RmqErrorService } from "@app/errors";

@Injectable()
export class FileService implements Service {
  constructor(@Inject(FILE_REPOSITORY) private readonly repository: FileRepository, @BunnyStorage() private readonly storage: BunnyStorageService, @BunnyStream() private readonly stream: BunnyStreamService, private readonly exceptionService: RmqErrorService) { }
  private generateVideoTitle(): string {
    return randomUUID()
  }

  async generateVideoSignature(params: GenerateVideoSignatureParams): Promise<GenerateVideoSignatureReturn> {
    const { userId } = params;

    const video = await this.stream.createVideo({
      title: this.generateVideoTitle()
    })

    if (!video.guid) {
      throw this.exceptionService.forbidden()
    }

    const signature = await this.stream.generateSignature({
      videoId: video.guid,
    });

    const file = await this.createOne({
      authorId: userId,
      path: null,
      providerId: video.guid,
      type: FileType.VIDEO,
      uploadStatus: UploadStatus.QUEUED,
    })

    return {
      file,
      metadata: signature,
    }
  }

  private createFilePath(userId: number, originalname: string): string {
    const date = new Date();

    const dayMonthYear = format(date, 'dd-MM-yyyy');

    return `${userId}/${dayMonthYear}/${originalname}`;
  }

  async uploadImage(userId: number, input: UploadFileInput): Promise<FileModel> {
    const { buffer, originalname } = input;

    const filePath = this.createFilePath(userId, originalname);

    await this.storage.uploadFile(filePath, buffer);

    return this.createOne({
      authorId: userId,
      providerId: null,
      path: filePath,
      type: FileType.IMAGE,
      uploadStatus: null,
    })
  }

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
