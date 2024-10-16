import { publicationValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class PublicationDto extends createZodDto(publicationValidationSchema) { }
