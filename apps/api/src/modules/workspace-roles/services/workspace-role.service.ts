import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_ROLE_REPOSITORY } from "../providers/workspace-role.providers";
import { WorkspaceRoleRepository } from "../repositories/worksoace-role.repository";
import { CreateWorkspaceRoleParams, Service } from "./workspace-role.service.interface";
import { WorkspaceRole } from "@app/types";
import { WorkspaceRoleModel } from "../models/workspace-role.model";
import { RmqErrorService } from "@app/errors";

@Injectable()
export class WorkspaceRoleService implements Service {
  constructor(
    @Inject(WORKSPACE_ROLE_REPOSITORY) private repository: WorkspaceRoleRepository,
    private readonly rmqErrorService: RmqErrorService
  ) { }
  async createWorkspaceRole(input: CreateWorkspaceRoleParams): Promise<WorkspaceRoleModel> {
    const entities = await this.repository.createOne({
      role: input.role,
    })

    const [entity] = entities;

    return WorkspaceRoleModel.fromEntity(entity);
  }
  async findWorkspaceRole(role: WorkspaceRole): Promise<WorkspaceRoleModel> {
    const entity = await this.repository.findByRole(role);

    if (!entity) {
      this.rmqErrorService.notFound();
    }

    return WorkspaceRoleModel.fromEntity(entity);
  }
  async deleteWorkspaceRole(role: WorkspaceRole): Promise<void> {
    await this.repository.deleteByRole(role);
  }
}
