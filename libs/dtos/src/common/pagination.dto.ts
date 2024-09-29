import { paginationValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class PaginationDto extends createZodDto(paginationValidationSchema) { }
