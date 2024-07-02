import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class IsEnumPipe implements PipeTransform {
  private availableValues: unknown[];

  constructor(private readonly enumType: object) {
    const availableValues = Object.values(this.enumType);

    if (availableValues.length === 0) {
      throw new Error('Enum must have at least one value');
    }

    this.availableValues = availableValues;
  }

  transform(value: unknown) {
    const isEnumValue = this.availableValues.includes(value);

    if (!isEnumValue) {
      throw new Error(`Invalid value. Available values are: ${this.availableValues.join(', ')}`);
    }

    return value;
  }
}
