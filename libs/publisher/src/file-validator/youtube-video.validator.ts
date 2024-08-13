import { BlobObject, FileValidatorAbstract } from './file-validator.abstract';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { VideoConfig } from '../configs/file-validator';

@Injectable()
export class YoutubeVideoValidator extends FileValidatorAbstract {
  constructor(private readonly config: VideoConfig) {
    super();
  }

  private readonly schema = z.object({
    size: z.number().max(this.config.maxSize),
    length: z.number().max(this.config.maxLength),
    format: z
      .string()
      .refine((format) => this.config.containerFormats.includes(format), {
        message: `Format must be one of: ${this.config.containerFormats.join(', ')}`,
      }),
    resolution: z
      .object({
        width: z.number(),
        height: z.number(),
      })
      .refine(
        (res) =>
          this.config.resolutions.some(
            (allowedRes) =>
              allowedRes.width === res.width &&
              allowedRes.height === res.height,
          ),
        {
          message: `Resolution must be one of: ${this.config.resolutions.map((res) => `${res.width}x${res.height}`).join(', ')}`,
        },
      ),
    aspectRatio: z
      .string()
      .refine((aspectRatio) => this.config.aspectRatio.includes(aspectRatio), {
        message: `Aspect ratio must be one of: ${this.config.aspectRatio.join(', ')}`,
      }),
    frameRate: z
      .number()
      .refine((frameRate) => this.config.frameRates.includes(frameRate), {
        message: `Frame rate must be one of: ${this.config.frameRates.join(', ')}`,
      }),
  });

  private maxFileAmount = 1;

  override validateFiles(objects: BlobObject[]): boolean {
    return objects.length <= this.maxFileAmount;
  }
  override validateVideoFile(object: BlobObject): boolean {
    const result = this.schema.safeParse(object.config);

    return result.success;
  }
  override validateImageFile(): boolean {
    return false;
  }
}
