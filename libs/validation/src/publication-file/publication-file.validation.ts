import { z } from 'zod';
import { postId } from '../post/post.validation';
import { fileId } from '../file';

export const publicationFileId = z.number();

export const publicationFileIsOriginal = z.boolean();

export const publicationFileValidationSchema = z.object({
  id: publicationFileId,
  postId,
  fileId,
  isOriginal: publicationFileIsOriginal,
});

export type PublicationFile = z.infer<typeof publicationFileValidationSchema>;
