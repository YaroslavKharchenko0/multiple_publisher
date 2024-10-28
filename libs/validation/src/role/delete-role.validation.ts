import { z } from 'zod';
import { role } from './role.validation';

export const deleteRoleValidationSchema = z.object({
  role,
});

export type DeleteRoleRequest = z.infer<typeof deleteRoleValidationSchema>;

export type DeleteRoleResponse = null;
