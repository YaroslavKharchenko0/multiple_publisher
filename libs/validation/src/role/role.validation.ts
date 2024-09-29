import { Role as RoleEnum } from '@app/types';
import { z } from 'zod';

export const role = z.nativeEnum(RoleEnum);
export const roleId = z.number();

export const roleValidationSchema = z.object({
  id: roleId,
  role,
});

export type Role = z.infer<typeof roleValidationSchema>;
