import { UserModel } from "../models/user.model";

export interface CreateUser {
  email: string;
  providerId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateUser { }

export interface Service {
  createUser(input: CreateUser): Promise<UserModel>;
  findUserById(id: number): Promise<UserModel | null>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  updateUserById(id: number, input: UpdateUser): Promise<UserModel | null>;
  deleteUserById(id: number): Promise<void>;
}
