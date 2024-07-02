import { Role } from "@app/types";
import { RoleModel } from "../models/role.model";
import { Pagination } from "@app/validation";

export interface Service {
  createRole(role: Role): Promise<RoleModel>;
  findRoleByRole(role: Role): Promise<RoleModel | null>;
  findRoles(pagination: Pagination): Promise<RoleModel[]>;
  deleteRole(role: Role): Promise<void>;
}
