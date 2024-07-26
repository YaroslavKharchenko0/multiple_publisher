import { Inject, Injectable } from '@nestjs/common';
import { Service } from './publication-file.service.interface';
import { PublicationFileModel } from '../models/publication-file.model';
import { PublicationFileRepository } from '../repositories/publication-file.repository';
import { POST_FILE_REPOSITORY } from '../providers/publication-file.providers';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DeleteFileCommand } from '@app/contracts';
import { Options } from '@app/types';

@Injectable()
export class PublicationFileService implements Service {
  constructor(
    @Inject(POST_FILE_REPOSITORY)
    private readonly repository: PublicationFileRepository,
    private readonly amqpConnection: AmqpConnection,
  ) { }
  async createPublicationFiles(
    publicationId: number,
    fileIds: number[],
    isOriginal: boolean,
  ): Promise<PublicationFileModel[]> {
    const inputs = fileIds.map((fileId) => {
      return {
        publicationId,
        fileId,
        isOriginal,
      };
    });

    const entities = await this.repository.createMany(inputs);

    return entities.map(PublicationFileModel.fromEntity);
  }

  async findPublicationFiles(
    publicationId: number,
  ): Promise<PublicationFileModel[]> {
    const entities = await this.repository.findByPublicationId(publicationId);

    return entities.map(PublicationFileModel.fromEntity);
  }
  async deletePublicationFiles(
    publicationId: number,
    options: Options,
  ): Promise<PublicationFileModel[]> {
    const entities = await this.repository.deleteByPublicationId(publicationId);

    const models = entities.map(PublicationFileModel.fromEntity);

    const onlyUnOriginalFiles = models.filter((model) => !model.isOriginal);

    const deleteFilePromises = onlyUnOriginalFiles.map((entity) => {
      const payload: DeleteFileCommand.Request = {
        id: entity.fileId,
      };

      return this.amqpConnection.request<DeleteFileCommand.Response>({
        exchange: DeleteFileCommand.exchange,
        routingKey: DeleteFileCommand.routingKey,
        payload: payload,
        headers: {
          traceId: options?.traceId,
        },
      });
    });

    await Promise.all(deleteFilePromises);

    return entities.map(PublicationFileModel.fromEntity);
  }
}
