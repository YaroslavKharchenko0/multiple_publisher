import { Injectable } from '@nestjs/common';
import {
  CreatePostInput,
  Service,
  UpdatePostInput,
} from './post.service.interface';
import { Pagination } from '@app/validation';
import { PostModel } from '../models/post.model';
import { PostRepository } from '../repositories/posts.repository';
import { RmqErrorService } from '@app/errors';

@Injectable()
export class PostService implements Service {
  constructor(
    private readonly repository: PostRepository,
    private readonly rmqErrorService: RmqErrorService,
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
  async deletePost(id: number): Promise<void> {
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
}
