import { UseInterceptors } from "@nestjs/common"
import {
  FileFieldsInterceptor,
  MemoryStorageFile,
} from '@blazity/nest-file-fastify';

export type ImageFiles = {
  image?: [MemoryStorageFile]
}

export const ImageUpload = () => {
  return UseInterceptors(FileFieldsInterceptor([{
    name: 'image',
    maxCount: 1,
  }]))
}
