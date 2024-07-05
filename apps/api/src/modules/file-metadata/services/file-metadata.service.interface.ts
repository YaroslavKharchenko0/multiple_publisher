import { Pagination } from "@app/validation"
import { FileModel } from "../models/file-metadata.model"

export interface CreateMetadata {
  key: string
  value: string
  fileId: number
}

export interface Service {
  createOne(input: CreateMetadata): Promise<FileModel>
  findByFileId(id: number, pagination: Pagination): Promise<FileModel[]>
  deleteById(id: number): Promise<FileModel>
}
