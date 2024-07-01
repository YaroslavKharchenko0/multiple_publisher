import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsStringNumberPipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value !== 'string' || isNaN(Number(value))) {
      throw new BadRequestException(`${value} is not a valid number string`);
    }
    return value;
  }
}
