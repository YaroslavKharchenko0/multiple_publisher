import { Pagination } from '@app/validation';
import { PublicationModel } from '../models/publication.model';
import { PublicationStatus } from '@app/types';

export interface CreatePublicationParams {
  title?: string;
  description?: string;
  postId: number;
  accountId: number;
}

export interface UpdatePublicationParams {
  title?: string;
  description?: string;
  status?: PublicationStatus;
}

export interface Service {
  createPublication(params: CreatePublicationParams): Promise<PublicationModel>;
  findPublicationById(id: number): Promise<PublicationModel>;
  findPostPublications(
    postId: number,
    pagination: Pagination,
  ): Promise<PublicationModel[]>;
  updatePublicationById(
    id: number,
    params: UpdatePublicationParams,
  ): Promise<PublicationModel>;
  deletePublicationById(id: number): Promise<PublicationModel>;
}
