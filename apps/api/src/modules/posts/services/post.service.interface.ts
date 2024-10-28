import { Options, PostType } from '@app/types';
import { PostModel } from '../models/post.model';
import { Pagination, PaginationMetadata } from '@app/validation';

export interface CreatePostInput {
  userId: number;
  type: PostType;
  title: string;
  description: string;
}

export interface UpdatePostInput {
  type?: PostType;
  title?: string;
  description?: string;
}

export interface Service {
  createPost(input: CreatePostInput): Promise<PostModel>;
  updatePost(id: number, input: UpdatePostInput): Promise<PostModel>;
  deletePost(id: number, options?: Options): Promise<void>;
  getPostById(id: number): Promise<PostModel>;
  getUserPosts(userId: number, pagination: Pagination): Promise<PostModel[]>;
  getUserPostsPaginationMetadata(userId: number): Promise<PaginationMetadata>;
  getPosts(pagination: Pagination): Promise<PostModel[]>;
  getPostsPaginationMetadata(): Promise<PaginationMetadata>;
}
