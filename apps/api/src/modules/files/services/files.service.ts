import { Inject, Injectable } from "@nestjs/common";
import { CreateFileInput, GenerateVideoSignatureParams, GenerateVideoSignatureReturn, Service, UploadFileInput, Options as ServiceOptions, OnWebhook } from "./files.service.interface";
import { FileModel } from "../models/file.model";
import { FILE_REPOSITORY } from "../providers/file.providers";
import { FileRepository } from "../repositories/files.repository";
import { Pagination } from "@app/validation";
import { BunnyStorage, BunnyStorageService, BunnyStream, BunnyStreamService } from "@app/bunny";
import { format } from "date-fns";
import { FileType, UploadStatus } from "@app/types";
import { randomUUID } from "crypto";
import { RmqErrorService } from "@app/errors";
import { FileFacade } from "@app/utils";

@Injectable()
export class FileService implements Service {
  constructor(@Inject(FILE_REPOSITORY) private readonly repository: FileRepository, @BunnyStorage() private readonly storage: BunnyStorageService, @BunnyStream() private readonly stream: BunnyStreamService, private readonly exceptionService: RmqErrorService, private readonly fileFacade: FileFacade) { }
  private generateVideoTitle(): string {
    return randomUUID()
  }

  async onWebhook(params: OnWebhook): Promise<void> {
    const { Status, VideoGuid } = params;

    const status = this.stream.statusMap[Status];

    if (!status) {
      throw this.exceptionService.badRequest();
    }

    await this.updateByProviderId(VideoGuid, {
      uploadStatus: status,
    })
  }

  async generateVideoSignature(params: GenerateVideoSignatureParams, options?: ServiceOptions): Promise<GenerateVideoSignatureReturn> {
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

    const metadata: Record<string, string> = {
      title: video.title,
      storage_size: video?.storageSize?.toString(),
      library_id: video?.videoLibraryId?.toString(),
    }

    await this.fileFacade.addMetadata(file.id, metadata, options?.traceId)

    return {
      file,
      metadata: signature,
    }
  }

  private createFilePath(userId: number, originalname: string): string {
    const date = new Date();

    const dayMonthYear = format(date, 'dd-MM-yyyy');

    const name = originalname.replace(/ /g, '_');

    const time = date.getTime();

    return `users/${userId}/${dayMonthYear}/${time}-${name}`;
  }

  async uploadImage(userId: number, input: UploadFileInput, options?: ServiceOptions): Promise<FileModel> {
    const { buffer, originalname, mimetype, size } = input;

    const filePath = this.createFilePath(userId, originalname);

    await this.storage.uploadFile(filePath, buffer);

    const metadata: Record<string, string> = {
      mimetype,
      size: size.toString(),
    }

    const file = await this.createOne({
      authorId: userId,
      providerId: null,
      path: filePath,
      type: FileType.IMAGE,
      uploadStatus: null,
    })

    await this.fileFacade.addMetadata(file.id, metadata, options?.traceId)

    return file
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
  async updateByProviderId(providerId: string, input: Partial<FileModel>): Promise<FileModel> {
    const entities = await this.repository.updateByProviderId(providerId, input);

    const [entity] = entities;

    return FileModel.fromEntity(entity);
  }
  async deleteById(id: number, userId?: number): Promise<FileModel> {
    const entities = await this.repository.deleteById(id, userId);

    const [entity] = entities;

    if (!entity) {
      throw this.exceptionService.notFound();
    }

    const model = FileModel.fromEntity(entity);

    if (model.isImage()) {
      await this.storage.deleteFile(model.path);
    }

    if (model.isVideo()) {
      await this.stream.deleteVideoFile({
        videoId: model.providerId,
      });
    }

    return model;
  }
}
