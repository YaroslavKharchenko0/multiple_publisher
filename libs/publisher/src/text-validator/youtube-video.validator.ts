import { TextValidatorAbstract } from './text-validator.abstract';

export class YouTubeVideoTextValidator extends TextValidatorAbstract {
  override validateDescription(text: string): boolean {
    return text.length <= 50;
  }
  override validateTitle(text: string): boolean {
    return text.length <= 200;
  }
}
