import { PostFileModel } from '../models/post-file.model';

export interface Service {
  findPostFiles(postId: number): Promise<PostFileModel[]>;
  deletePostFiles(postId: number): Promise<PostFileModel[]>;
}
