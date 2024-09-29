import { z } from 'zod';
import { postDescription, postId, postTitle } from '../post';
import { PublicationStatus } from '@app/types';
import { accountId } from '../account';
import { publicationProviderId } from '../publication-provider';

export const publicationId = z.number();
export const publicationTitle = postTitle;
export const publicationDescription = postDescription;
export const publicationStatus = z.nativeEnum(PublicationStatus);

export const publicationValidationSchema = z.object({
  id: publicationId,
  title: publicationTitle,
  description: publicationDescription,
  publicationProviderId,
  postId,
  status: publicationStatus,
  accountId,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Publication = z.infer<typeof publicationValidationSchema>;
