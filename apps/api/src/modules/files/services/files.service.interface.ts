import { FileType, UploadStatus } from "@app/types";
import { FileModel } from "../models/file.model";
import { Pagination } from "@app/validation";

export interface CreateFileInput {
  providerId: string;
  type: FileType;
  authorId: number;
  uploadStatus: UploadStatus | null;
}

export interface Service {
  createOne(input: CreateFileInput): Promise<FileModel>;
  findById(id: number): Promise<FileModel>;
  findByProviderId(providerId: string): Promise<FileModel>;
  findUserFiles(authorId: number, pagination: Pagination): Promise<FileModel[]>;
  updateById(id: number, input: Partial<FileModel>): Promise<FileModel>;
  deleteById(id: number, userId?: number): Promise<FileModel>;
}
