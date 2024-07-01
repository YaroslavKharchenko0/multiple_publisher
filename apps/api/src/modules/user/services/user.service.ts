import { Inject, Injectable } from "@nestjs/common";
import { CreateUser, Service, UpdateUser } from "./user.service.interface";
import { UserModel } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { USER_REPOSITORY } from "../providers/user.service.provider";

@Injectable()
export class UserService implements Service {
  constructor(@Inject(USER_REPOSITORY) private readonly repository: UserRepository) { }

  async createUser(input: CreateUser): Promise<UserModel> {
    const userEntities = await this.repository.createOne(input);

    const [userEntity] = userEntities

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  async findUserById(id: number): Promise<UserModel> {
    const userEntity = await this.repository.findById(id);

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  async findUserByEmail(email: string): Promise<UserModel> {
    const userEntity = await this.repository.findByEmail(email);

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  async findUserByProviderId(id: string): Promise<UserModel> {
    const userEntity = await this.repository.findByProviderId(id);

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  async updateUserById(id: number, input: UpdateUser): Promise<UserModel> {
    const userEntities = await this.repository.updateById(id, input);

    const [userEntity] = userEntities

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  deleteUserById(id: number): Promise<void> {
    return this.repository.deleteById(id);
  }
}
