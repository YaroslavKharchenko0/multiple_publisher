import { z } from 'zod';
import { Role, role } from './role.validation';

export const createRoleValidationSchema = z.object({
  role,
});

export type CreateRoleRequest = z.infer<typeof createRoleValidationSchema>;

export type CreateRoleResponse = Role;
