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


export interface Service {
  createUserRoleByRoleName(params: CreateUserRoleByRoleNameParams): Promise<UserRoleModel>;
  createUserRole(params: CreateUserRoleParams): Promise<UserRoleModel>;
  findUserRole(userId: number): Promise<UserRoleModel | null>;
  deleteUserRole(userId: number): Promise<void>;
  updateUserRoleByRoleName(params: CreateUserRoleByRoleNameParams): Promise<UserRoleModel>;
  updateUserRole(params: CreateUserRoleParams): Promise<UserRoleModel>;
}
