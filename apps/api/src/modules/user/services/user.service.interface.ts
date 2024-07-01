import { UserModel } from "../models/user.model";

export interface CreateUser {
  email: string;
}

export interface UpdateUser {
  email?: string;
}

export interface Service {
  createUser(input: CreateUser): Promise<UserModel>;
  findUserById(id: number): Promise<UserModel | null>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  updateUserById(id: number, input: UpdateUser): Promise<UserModel | null>;
  deleteUserById(id: number): Promise<void>;
}
