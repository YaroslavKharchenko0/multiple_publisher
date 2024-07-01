import { Inject } from '@nestjs/common';
import { PG_CONNECTION } from './database.constants';

export const Orm = () => Inject(PG_CONNECTION);
