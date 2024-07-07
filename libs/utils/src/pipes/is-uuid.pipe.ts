import { Injectable, PipeTransform } from "@nestjs/common";
import { z } from 'zod';

@Injectable()
export class IsUUIDPipe implements PipeTransform {
  transform(value: unknown) {
    const isUUID = z.string().uuid().safeParse(value);

    if (!isUUID.success) {
      throw new Error(`${value} is not a valid UUID`);
    }

    return value;
  }
}
