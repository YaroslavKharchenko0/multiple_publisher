import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FILE_ACCESS_KEY, Options } from '../decorators';
import { File } from '@app/validation';
import { randomUUID } from 'crypto';
import { FileFacade } from '../facades/file.facade';
import { JWTUser } from '@app/types';

@Injectable()
export class FileAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly fileFacade: FileFacade,
  ) { }

  private async findFile(
    options: Options,
    params: Record<string, string>,
  ): Promise<File | null> {
    let file: File | null = null;

    const traceId = `file-access-${randomUUID()}`;

    const fileId = Number(params?.['fileId']);

    if (options.search?.fileId && fileId) {
      file = await this.fileFacade.findById(fileId, traceId);
    }

    const providerId = params?.['providerId'];

    if (!file && options.search?.providerId && providerId) {
      file = await this.fileFacade.findByProviderId(providerId, traceId);
    }

    return file;
  }

  private checkAccess(options: Options, file: File, jwtUser: JWTUser): boolean {
    if (jwtUser.isAdmin()) {
      return true;
    }

    if (options.by.user) {
      return jwtUser.isMe(file.authorId);
    }

    return false;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.getAllAndOverride<Options>(FILE_ACCESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!options) {
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

    const file = await this.findFile(options, params);

    if (!file) {
      return false;
    }

    return this.checkAccess(options, file, jwtUser);
  }
}
