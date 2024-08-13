export interface VideoConfig {
  maxSize: number; // in bytes
  maxLength: number; // in seconds
  minLength: number; // in seconds
  aspectRatio: string[];
  frameRates: number[];
  resolutions: { width: number; height: number }[];
  videoCodecs: string[];
  audioCodecs: string[];
  audioBitrate: number; // in kbps
  containerFormats: string[];
}

export interface VideoFileConfig {
  size: number;
  length: number;
  format: string;
  resolution: { width: number; height: number };
  aspectRatio: string;
  frameRate: number;
  videoCodec: string;
  audioCodec: string;
  audioBitrate: number;
  downloadUrl: string;
}
