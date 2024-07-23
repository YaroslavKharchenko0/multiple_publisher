import { Inject, Injectable } from '@nestjs/common';
import { Service } from './post-file.service.interface';
import { PostFileModel } from '../models/post-file.model';
import { PostFileRepository } from '../repositories/post-files.repository';
import { POST_FILE_REPOSITORY } from '../providers/post-file.providers';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DeleteFileCommand } from '@app/contracts';
import { Options } from '@app/types';

@Injectable()
export class PostFileService implements Service {
  constructor(
    @Inject(POST_FILE_REPOSITORY)
    private readonly repository: PostFileRepository,
    private readonly amqpConnection: AmqpConnection,
  ) { }
  async createPostFiles(
    postId: number,
    fileIds: number[],
  ): Promise<PostFileModel[]> {
    const inputs = fileIds.map((fileId) => {
      return {
        postId,
        fileId,
      };
    });

    const entities = await this.repository.createMany(inputs);

    return entities.map(PostFileModel.fromEntity);
  }

  async findPostFiles(postId: number): Promise<PostFileModel[]> {
    const entities = await this.repository.findByPostId(postId);

    return entities.map(PostFileModel.fromEntity);
  }
  async deletePostFiles(
    postId: number,
    options: Options,
  ): Promise<PostFileModel[]> {
    const entities = await this.repository.deleteByPostId(postId);

    const deleteFilePromises = entities.map((entity) => {
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

    return entities.map(PostFileModel.fromEntity);
  }
}
