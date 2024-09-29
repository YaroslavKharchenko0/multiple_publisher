import { Role as RoleEnum } from '@app/types';
import { z } from 'zod';

export const role = z.nativeEnum(RoleEnum).describe('Role');
export const roleId = z.number().describe('Role id');

export const roleValidationSchema = z.object({
  id: roleId,
  role,
});

export type Role = z.infer<typeof roleValidationSchema>;
