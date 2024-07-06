import { ISODate } from "@app/types";

export interface BunnyStorageConfig {
  storageEndpoint: string;
  storageZoneName: string;
  storageApiKey: string;
}

export interface BunnyStreamConfig {
  libraryId: string;
  apiKey: string;
  videoUrl: string;
}

export interface BunnyConfig {
  storage: BunnyStorageConfig;
  stream: BunnyStreamConfig;
}

export interface BunnyVideoCaption {
  srclang?: string;
  label?: string;
}

export interface BunnyVideoChapter {
  title: string;
  start: number;
  end: number;
}

export interface BunnyVideoMoment {
  label: string;
  timestamp: number;
}

export interface BunnyVideoMetaTag {
  property?: string;
  value?: string;
}

export interface BunnyVideoTranscodingMessage {
  timeStamp: ISODate;
  level: 1 | 2 | 3;
  issueCode: 1;
  message?: string;
  value?: string;
}

export interface BunnyDeleteVideoResponse {
  success: boolean;
  message?: string;
  statusCode: number;
}

export interface BunnyCreateVideoResponse {
  videoLibraryId: number;
  guid?: string;
  title?: string;
  dateUploaded: ISODate;
  views: number;
  isPublic: boolean;
  length: number;
  status: 1 | 2 | 3 | 4 | 5 | 6;
  framerate: number;
  width: number;
  height: number;
  availableResolutions?: string;
  thumbnailCount: number;
  encodeProgress: number;
  storageSize: number;
  captions?: BunnyVideoCaption[];
  hasMP4Fallback: boolean;
  collectionId?: string;
  thumbnailFileName?: string;
  averageWatchTime: number;
  totalWatchTime: number;
  category?: string;
  chapters?: BunnyVideoChapter[];
  moments?: BunnyVideoMoment[];
  metaTags: BunnyVideoMetaTag[];
  transcodingMessages: BunnyVideoTranscodingMessage[];
}

export interface ErrorResponse<S, M = string> {
  status: S;
  message: M;
}

export interface SuccessResponse<T, S = 200> {
  status: S;
  data: T;
}

export type CreateVideoResponse =
  | ErrorResponse<401>
  | ErrorResponse<500>
  | SuccessResponse<BunnyCreateVideoResponse>;

export interface BunnyDeleteVideoResponse {
  success: boolean;
  message?: string;
  statusCode: number;
}


export type DeleteVideoResponse =
  | ErrorResponse<401>
  | ErrorResponse<500>
  | ErrorResponse<404>
  | SuccessResponse<BunnyDeleteVideoResponse>;

export interface GenerateSignatureParams {
  videoId: string;
  expirationTime?: Date;
}

export interface CreateVideoParams {
  title: string;
}

export interface DeleteVideoFileParams {
  videoId: string;
}
