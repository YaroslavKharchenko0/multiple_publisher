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
  pullZoneUrl: string;
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

export interface GenerateSignatureResponse {
  signature: string;
  unixExpirationTime: number;
  videoId: string;
  libraryId: string;
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
  thumbnailTime?: number;
}

export interface DeleteVideoFileParams {
  videoId: string;
}

export interface FindVideoMetadata {
  videoId: string;
}

export interface Caption {
  srclang: string | null;
  label: string | null;
}

export interface Chapter {
  title: string;
  start: number; // int32
  end: number; // int32
}

export interface Moment {
  label: string;
  timestamp: number; // int32
}

export interface MetaTag {
  property: string | null;
  value: string | null;
}

export interface TranscodingMessage {
  timeStamp: string; // date-time
  level: 0 | 1 | 2 | 3; // 0 = Undefined, 1 = Information, 2 = Warning, 3 = Error
  issueCode: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // Issue codes
  message: string | null;
  value: string | null;
}

export interface Video {
  videoLibraryId: number; // int64
  guid: string | null;
  title: string | null;
  dateUploaded: string; // date-time
  views: number; // int64
  isPublic: boolean;
  length: number; // int32
  status: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // Status codes
  framerate: number; // double
  rotation: number | null;
  width: number; // int32
  height: number; // int32
  availableResolutions: string | null;
  thumbnailCount: number; // int32
  encodeProgress: number; // int32
  storageSize: number; // int64
  captions: Caption[] | null;
  hasMP4Fallback: boolean;
  collectionId: string | null;
  thumbnailFileName: string | null;
  averageWatchTime: number; // int64
  totalWatchTime: number; // int64
  category: string | null;
  chapters: Chapter[] | null;
  moments: Moment[] | null;
  metaTags: MetaTag[] | null;
  transcodingMessages: TranscodingMessage[] | null;
}
