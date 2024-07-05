import { Inject, Injectable } from "@nestjs/common";
import { CreateOne, DeleteOneParams, FindOneParams, FindWorkspaceUsersParams, Service, UpdateOneParams, UpdateWorkspaceUserParams } from "./workspace-user.service.interface";
import { WorkspaceUserModel } from "../models/workspace-user.model";
import { WORKSPACE_USER_REPOSITORY } from "../providers/workspace-user.providers";
import { WorkspaceUserRepository } from "../repositories/workspace-user.repository";

@Injectable()
export class WorkspaceUserService implements Service {
  constructor(@Inject(WORKSPACE_USER_REPOSITORY) private readonly repository: WorkspaceUserRepository) { }
  async createOne(input: CreateOne): Promise<WorkspaceUserModel> {
    const entities = await this.repository.createOne(input)

    const [entity] = entities

    return WorkspaceUserModel.fromEntity(entity)
  }
  async findOne(params: FindOneParams): Promise<WorkspaceUserModel> {
    const entity = await this.repository.findOne(params)

    return WorkspaceUserModel.fromEntity(entity)
  }
  async updateOne(params: UpdateOneParams, input: Partial<UpdateWorkspaceUserParams>): Promise<WorkspaceUserModel> {
    const entities = await this.repository.updateOne(params, input)

    const [entity] = entities

    return WorkspaceUserModel.fromEntity(entity)
  }
  async deleteOne(params: DeleteOneParams): Promise<WorkspaceUserModel> {
    const entities = await this.repository.deleteOne(params)

    const [entity] = entities

    return WorkspaceUserModel.fromEntity(entity)
  }
  async findWorkspaceUsers(params: FindWorkspaceUsersParams): Promise<WorkspaceUserModel[]> {
    const entities = await this.repository.findWorkspaceUsers({
      workspaceId: params.workspaceId,
      pagination: {
        limit: params?.pagination?.limit,
        offset: params?.pagination?.offset
      }
    })

    return entities.map(WorkspaceUserModel.fromEntity)
  }
}
