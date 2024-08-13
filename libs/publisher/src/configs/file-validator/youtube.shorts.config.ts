import { VideoConfig } from './file-validator.interfaces';

export const createYoutubeShortsValidatorConfig = (): VideoConfig => {
  return {
    maxSize: 60 * 1024 * 1024, // 60 MB
    maxLength: 60, // 60 seconds
    minLength: 0, // No minimum length
    aspectRatio: ['9:16', '1:1'],
    frameRates: [30, 60],
    resolutions: [
      { width: 1080, height: 1920 }, // 1080p
    ],
    videoCodecs: ['MPEG-4 (H.264)'],
    audioCodecs: ['AAC'],
    audioBitrate: 128, // 128 kbps or higher
    containerFormats: ['MP4', 'MOV', 'AVI', 'WMV', 'FLV'],
  };
};
