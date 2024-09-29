import { HTTP_METHOD } from '@app/domain/types';
import { Get, Post, Put, Delete, Patch } from '@nestjs/common';

export const routeFactory = (method: HTTP_METHOD, path: string) => {
  switch (method) {
    case HTTP_METHOD.GET:
      return Get(path);
    case HTTP_METHOD.POST:
      return Post(path);
    case HTTP_METHOD.PUT:
      return Put(path);
    case HTTP_METHOD.DELETE:
      return Delete(path);
    case HTTP_METHOD.PATCH:
      return Patch(path);
    default:
      throw new Error(`HTTP method ${method} not supported.`);
  }
};
