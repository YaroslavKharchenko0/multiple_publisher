import {
  BunnyCreateVideoResponse,
  BunnyDeleteVideoResponse,
  CreateVideoParams,
  DeleteVideoFileParams,
  FindVideoMetadata,
  GenerateSignatureParams,
  GenerateSignatureResponse,
  Video,
} from './bunny.types';

export interface Storage {
  uploadFile(
    filePath: string,
    file: string,
    encoding?: BufferEncoding,
  ): Promise<void>;
  deleteFile(filePath: string): Promise<void>;
  downloadFile(filePath: string): Promise<Stream>;
}

export interface Stream {
  generateSignature(params: GenerateSignatureParams): GenerateSignatureResponse;
  createVideo(
    params: CreateVideoParams,
  ): Promise<BunnyCreateVideoResponse | null>;
  deleteVideoFile(
    params: DeleteVideoFileParams,
  ): Promise<BunnyDeleteVideoResponse | null>;
  findVideoMetadata(params: FindVideoMetadata): Promise<Video | null>;
  getVideoUrl(videoId: string): string;
}
