import { Injectable } from '@nestjs/common';
import {
  CreatePostInput,
  Service,
  UpdatePostInput,
} from './post.service.interface';
import { Pagination, PaginationMetadata } from '@app/validation';
import { PostModel } from '../models/post.model';
import { PostRepository } from '../repositories/posts.repository';
import { RmqErrorService } from '@app/errors';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DeletePostFilesCommand } from '@app/contracts';
import { Options } from '@app/types';

@Injectable()
export class PostService implements Service {
  constructor(
    private readonly repository: PostRepository,
    private readonly rmqErrorService: RmqErrorService,
    private readonly amqpConnection: AmqpConnection,
  ) { }
  async createPost(input: CreatePostInput): Promise<PostModel> {
    const entities = await this.repository.createOne(input);

    const [entity] = entities;

    if (!entity) {
      this.rmqErrorService.internalServerError();
    }

    return PostModel.fromEntity(entity);
  }
  async updatePost(id: number, input: UpdatePostInput): Promise<PostModel> {
    const entities = await this.repository.updateById(id, input);

    const [entity] = entities;

    if (!entity) {
      this.rmqErrorService.notFound();
    }

    return PostModel.fromEntity(entity);
  }
  async deletePost(id: number, options?: Options): Promise<void> {
    const deletePostFilesPayload: DeletePostFilesCommand.Request = {
      postId: id,
    };

    await this.amqpConnection.request({
      exchange: DeletePostFilesCommand.exchange,
      routingKey: DeletePostFilesCommand.routingKey,
      payload: deletePostFilesPayload,
      headers: {
        traceId: options?.traceId,
      },
    });

    await this.repository.deleteById(id);
  }
  async getPostById(id: number): Promise<PostModel> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      this.rmqErrorService.notFound();
    }

    return PostModel.fromEntity(entity);
  }
  async getUserPosts(
    userId: number,
    pagination: Pagination,
  ): Promise<PostModel[]> {
    const entities = await this.repository.findPostsByUserId(
      userId,
      pagination,
    );

    return entities.map(PostModel.fromEntity);
  }
  async getPosts(pagination: Pagination): Promise<PostModel[]> {
    const entities = await this.repository.findPosts(pagination);

    return entities.map(PostModel.fromEntity);
  }
  async getUserPostsPaginationMetadata(
    userId: number,
  ): Promise<PaginationMetadata> {
    const results = await this.repository.findPostsCountByUserId(userId);

    const [result] = results;

    if (!result) {
      this.rmqErrorService.notFound();
    }

    const metadata: PaginationMetadata = {
      total: result.count,
    };

    return metadata;
  }
  async getPostsPaginationMetadata(): Promise<PaginationMetadata> {
    const results = await this.repository.findPostsCount();

    const [result] = results;

    if (!result) {
      this.rmqErrorService.notFound();
    }

    const metadata: PaginationMetadata = {
      total: result.count,
    };

    return metadata;
  }
}
