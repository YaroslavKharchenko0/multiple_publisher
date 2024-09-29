import { createZodDto } from 'nestjs-zod';
import { accountValidationSchema } from '@app/validation';

export class AccountDto extends createZodDto(accountValidationSchema) { }
