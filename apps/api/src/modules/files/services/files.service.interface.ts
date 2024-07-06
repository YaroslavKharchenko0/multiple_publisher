import { Base64, FileType, UploadStatus } from "@app/types";
import { FileModel } from "../models/file.model";
import { Pagination } from "@app/validation";

export interface CreateFileInput {
  providerId: string;
  type: FileType;
  authorId: number;
  path: string | null;
  uploadStatus: UploadStatus | null;
}

export interface UploadFileInput {
  buffer: Base64;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface GenerateVideoSignatureParams {
  userId: number;
}

export interface GenerateVideoSignatureReturn {
  metadata: {
    signature: string;
    unixExpirationTime: number;
    libraryId: string;
    videoId: string;
  };
  file: FileModel
}

export interface Service {
  uploadImage(userId: number, input: UploadFileInput): Promise<FileModel>;
  generateVideoSignature(params: GenerateVideoSignatureParams): Promise<GenerateVideoSignatureReturn>;
  createOne(input: CreateFileInput): Promise<FileModel>;
  findById(id: number): Promise<FileModel>;
  findByProviderId(providerId: string): Promise<FileModel>;
  findUserFiles(authorId: number, pagination: Pagination): Promise<FileModel[]>;
  updateById(id: number, input: Partial<FileModel>): Promise<FileModel>;
  deleteById(id: number, userId?: number): Promise<FileModel>;
}
