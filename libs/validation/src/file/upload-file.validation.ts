import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { userId } from '../user';
import { File } from './file.validation';

export const uploadFileValidationSchema = z.object({
  userId,
  file: z.object({
    buffer: z.string().base64(),
    originalname: z.string(),
    mimetype: z.string(),
    size: z.number(),
  }),
});

export type UploadFileRequest = z.infer<typeof uploadFileValidationSchema>;

export class UploadFileBodyDto extends createZodDto(
  uploadFileValidationSchema,
) { }

export type UploadFileResponse = File;
