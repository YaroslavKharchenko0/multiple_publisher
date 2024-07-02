import { Role } from "@app/types";
import { UserRoleModel } from "../models/user-role.model";

export interface CreateUserRoleParams {
  userId: number;
  roleId: number;
}

export interface CreateUserRoleByRoleNameParams {
  userId: number;
  role: Role;
}

export interface UpdateUserRoleParams {
  userId: number;
  roleId: number;
}

export interface UpdateUserRoleByRoleNameParams {
  userId: number;
  role: Role;
}

export interface Options {
  traceId: string;
}


export interface Service {
  createUserRoleByRoleName(params: CreateUserRoleByRoleNameParams, options?: Options): Promise<UserRoleModel>;
  findUserRole(userId: number): Promise<UserRoleModel | null>;
  deleteUserRole(userId: number, options?: Options): Promise<void>;
  updateUserRoleByRoleName(params: CreateUserRoleByRoleNameParams, options?: Options): Promise<UserRoleModel>;
}
