import { Pagination, PaginationMetadata } from '@app/validation';
import { PublicationModel } from '../models/publication.model';
import { Options, PublicationStatus } from '@app/types';

export interface CreatePublicationParams {
  title?: string;
  description?: string;
  postId: number;
  accountId: number;
  publicationProviderId: number;
}

export interface UpdatePublicationParams {
  title?: string;
  description?: string;
  status?: PublicationStatus;
}

export interface Service {
  createPublication(
    params: CreatePublicationParams,
    options?: Options,
  ): Promise<PublicationModel>;
  findPublicationById(id: number): Promise<PublicationModel>;
  findPublication(id: number, postId: number): Promise<PublicationModel>;
  findPostPublications(
    postId: number,
    pagination: Pagination,
  ): Promise<PublicationModel[]>;
  createPostPublicationsPaginationMetadata(
    postId: number,
  ): Promise<PaginationMetadata>;
  updatePublication(
    id: number,
    postId: number,
    params: UpdatePublicationParams,
  ): Promise<PublicationModel>;
  deletePublication(id: number, postId: number): Promise<PublicationModel>;
  updatePublicationById(
    id: number,
    params: UpdatePublicationParams,
  ): Promise<PublicationModel>;
}
