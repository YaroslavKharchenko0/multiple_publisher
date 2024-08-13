export interface ValidateTextParams {
  description: string;
  title: string;
}

export abstract class TextValidatorAbstract {
  abstract validateDescription(text: string): boolean;
  abstract validateTitle(text: string): boolean;

  validateText(params: ValidateTextParams): boolean {
    const isValidDescription = this.validateDescription(params.description);
    const isValidTitle = this.validateTitle(params.title);

    return isValidDescription && isValidTitle;
  }
}
