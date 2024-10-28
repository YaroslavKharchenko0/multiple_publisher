import { z } from 'zod';
import {
  Publication,
  publicationDescription,
  publicationTitle,
} from './publication.validation';
import { postId } from '../post';
import { accountId } from '../account';
import { publicationProviderId } from '../publication-provider';

export const createPublicationValidationSchema = z
  .object({
    title: publicationTitle.optional(),
    description: publicationDescription.optional(),
    postId,
    accountId,
    publicationProviderId,
  })
  .required();

export type CreatePublicationRequest = z.infer<
  typeof createPublicationValidationSchema
>;

export type CreatePublicationResponse = Publication;
