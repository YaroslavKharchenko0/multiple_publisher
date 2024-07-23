import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PostFacade } from '../facades';
import {
  POST_ACCESS_KEY,
  PostAccessOptions,
} from '../decorators/post-access.decorator';
import { JWTUser } from '../decorators';
import { Post } from '@app/validation';
import { randomUUID } from 'crypto';

const postIdKey = 'postId';

@Injectable()
export class PostAccessGuard {
  constructor(
    private readonly reflector: Reflector,
    private readonly postFacade: PostFacade,
  ) { }

  async find(params: Record<string, string>) {
    const traceId = `post-access-${randomUUID()}`;

    const postId = Number(params?.[postIdKey]);

    if (!postId) {
      return null;
    }

    const post = await this.postFacade.findPostById(postId, traceId);

    return post;
  }

  private authorCheck(jwtUser: JWTUser, post: Post) {
    return jwtUser.isMe(post.userId);
  }

  async checkAccess(jwtUser: JWTUser, post: Post, options: PostAccessOptions) {
    const checks = [];

    if (options.isAuthor) {
      checks.push(this.authorCheck(jwtUser, post));
    }

    const isHasAccess = checks.some((check) => check);

    isHasAccess;
  }

  async canActivate(context: ExecutionContext) {
    const options = this.reflector.getAllAndOverride<PostAccessOptions>(
      POST_ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!options.isAuthor) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const jwtUser: JWTUser | undefined | null = request?.user;

    if (!jwtUser) {
      return false;
    }

    if (jwtUser.isAdmin()) {
      return true;
    }

    const params = request.params;

    const post = await this.find(params);

    if (!post) {
      return false;
    }

    return this.checkAccess(jwtUser, post, options);
  }
}
