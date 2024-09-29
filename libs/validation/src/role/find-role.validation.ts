import { z } from 'zod';
import { Role, role } from './role.validation';

export const findRoleValidationSchema = z.object({
  role,
});

export type FindRoleRequest = z.infer<typeof findRoleValidationSchema>;

export type FindRoleResponse = Role;
