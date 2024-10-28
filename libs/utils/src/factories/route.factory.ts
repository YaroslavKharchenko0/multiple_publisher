import { Get, Post, Put, Delete, Patch } from '@nestjs/common';
import { HttpMethod } from '@app/router';

export const routeFactory = (method: HttpMethod, path: string) => {
  switch (method) {
    case 'GET':
      return Get(path);
    case 'POST':
      return Post(path);
    case 'PUT':
      return Put(path);
    case 'DELETE':
      return Delete(path);
    case 'PATCH':
      return Patch(path);
    default:
      throw new Error(`HTTP method ${method} not supported.`);
  }
};
