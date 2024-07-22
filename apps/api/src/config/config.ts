import { ConfigModuleOptions } from '@nestjs/config';
import { envValidationSchema } from './env.config';

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: envValidationSchema,
};

export { configModuleOptions };
