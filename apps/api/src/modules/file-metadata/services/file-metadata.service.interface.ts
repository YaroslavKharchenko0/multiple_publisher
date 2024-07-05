import { Pagination } from "@app/validation"
import { FileMetadataModel } from "../models/file-metadata.model"

export interface CreateMetadata {
  key: string
  value: string
  fileId: number
}

export interface Service {
  createOne(input: CreateMetadata): Promise<FileMetadataModel>
  findByFileId(id: number, pagination: Pagination): Promise<FileMetadataModel[]>
  deleteById(id: number): Promise<FileMetadataModel>
}
