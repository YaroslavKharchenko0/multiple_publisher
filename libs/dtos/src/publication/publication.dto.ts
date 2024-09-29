import { publicationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class PublicationDto extends createZodDto(publicationValidationSchema) { }
