import { VideoConfig } from './file-validator.interfaces';

export const createYoutubeVideoValidatorConfig = (): VideoConfig => {
  return {
    maxSize: 128 * 1024 * 1024 * 1024, // 128 GB
    maxLength: 12 * 60 * 60, // 12 hours
    minLength: 33, // 33 seconds
    aspectRatio: ['16:9'],
    frameRates: [24, 25, 30],
    resolutions: [
      { width: 1920, height: 1080 }, // 1080p
      { width: 3840, height: 2160 }, // 2160p
    ],
    videoCodecs: ['MPEG-2', 'MPEG-4 (H.264)'],
    audioCodecs: ['MPEG Layer II', 'Dolby AC-3', 'AAC'],
    audioBitrate: 128, // 128 kbps or higher
    containerFormats: ['MP4', 'MOV', 'AVI', 'WMV', 'FLV'],
  };
};
