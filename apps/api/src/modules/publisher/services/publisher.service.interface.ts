import { Publication } from '@app/validation';

export interface PublishPublicationParams {
  publication: Publication;
}

export type PublishPublicationResult = {
  status: 'success' | 'error';
};

export interface Service {
  publishPublication(
    params: PublishPublicationParams,
  ): PublishPublicationResult;
}
