import { createZodDto } from '@anatine/zod-nestjs';
import { accountValidationSchema } from '@app/validation';

export class AccountDto extends createZodDto(accountValidationSchema) { }
