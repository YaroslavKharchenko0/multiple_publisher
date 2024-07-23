import { Injectable } from '@nestjs/common';
import { Service } from './post-file.service.interface';
import { PostFileModel } from '../models/post-file.model';
import { PostFileRepository } from '../repositories/post-files.repository';

@Injectable()
export class PostFileService implements Service {
  constructor(private readonly repository: PostFileRepository) { }

  async findPostFiles(postId: number): Promise<PostFileModel[]> {
    const entities = await this.repository.findByPostId(postId);

    return entities.map(PostFileModel.fromEntity);
  }
  async deletePostFiles(postId: number): Promise<PostFileModel[]> {
    const entities = await this.repository.deleteByPostId(postId);

    return entities.map(PostFileModel.fromEntity);
  }
}
