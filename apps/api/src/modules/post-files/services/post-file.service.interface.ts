import { Options } from '@app/types';
import { PostFileModel } from '../models/post-file.model';

export interface Service {
  createPostFiles(postId: number, fileIds: number[]): Promise<PostFileModel[]>;
  findPostFiles(postId: number): Promise<PostFileModel[]>;
  deletePostFiles(postId: number, options: Options): Promise<PostFileModel[]>;
}
