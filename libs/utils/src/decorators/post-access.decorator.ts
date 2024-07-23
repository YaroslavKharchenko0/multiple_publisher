import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PostAccessGuard } from '../guards/post-access.guard';

export const POST_ACCESS_KEY = 'POST_ACCESS_KEY';

export interface PostAccessOptions {
  isAuthor: boolean;
}

export const PostAccess = (options: PostAccessOptions) => {
  return applyDecorators(
    SetMetadata(POST_ACCESS_KEY, options),
    UseGuards(PostAccessGuard),
  );
};
