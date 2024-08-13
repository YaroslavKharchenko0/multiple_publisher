export class PublicationFileModel {
  id: number;
  publicationId: number;
  fileId: number;
  isOriginal: boolean;

  setFields(input: Partial<PublicationFileModel>) {
    this.id = input.id ?? this.id;
    this.publicationId = input.publicationId ?? this.publicationId;
    this.fileId = input.fileId ?? this.fileId;

    return this;
  }

  static fromEntity(input: Partial<PublicationFileModel>) {
    const entity = new PublicationFileModel().setFields(input);

    return entity;
  }
}
