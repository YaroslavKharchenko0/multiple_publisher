import { PublicationProvider } from '@app/types';
import { Pagination } from '@app/validation';
import { PublicationProviderModel } from '../models/publication-provider.model';

export interface CreatePublicationProviderParams {
  key: PublicationProvider;
  accountProviderId: number;
}

export interface Service {
  createPublicationProvider(
    params: CreatePublicationProviderParams,
  ): Promise<PublicationProviderModel>;
  findPublicationProvider(
    key: PublicationProvider,
  ): Promise<PublicationProviderModel>;
  findById(id: number): Promise<PublicationProviderModel>;
  findPublicationProviders(
    pagination: Pagination,
  ): Promise<PublicationProviderModel[]>;
  deletePublicationProvider(
    key: PublicationProvider,
  ): Promise<PublicationProviderModel>;
  findPublicationProvidersByAccountProvider(
    accountProviderId: number,
  ): Promise<PublicationProviderModel[]>;
}
