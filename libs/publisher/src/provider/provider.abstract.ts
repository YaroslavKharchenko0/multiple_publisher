import { File } from '@app/validation';
import { VideoFileConfig } from '../configs/file-validator';

export abstract class ProviderAbstract {
  abstract createFileConfig(file: File): Promise<VideoFileConfig | null>;
}
