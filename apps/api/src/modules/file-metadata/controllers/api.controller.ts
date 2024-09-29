import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Param, Query } from '@nestjs/common';
import {
  CreateFileMetadataCommand,
  DeleteFileMetadataCommand,
  FindFileMetadataByFileIdQuery,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  FileAccess,
  IsStringNumberPipe,
  ModuleRoute,
  Roles,
  Route,
  UserAccess,
} from '@app/utils';
import { Role } from '@app/types';
import {
  CreateFileMetadataBodyDto,
  FindFileMetadataByFileIdBodyDto,
} from '@app/dtos';

export const moduleName = 'fileMetadata';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findById')
  @Roles(Role.USER)
  @UserAccess()
  @FileAccess({
    by: {
      user: true,
    },
    search: {
      fileId: true,
    },
  })
  findById(
    @TraceId() traceId: string | undefined,
    @Param('fileId', IsStringNumberPipe) fileId: string,
    @Query() query: FindFileMetadataByFileIdBodyDto,
  ) {
    const numberFileId = Number(fileId);

    const payload: FindFileMetadataByFileIdQuery.Request = {
      fileId: numberFileId,
      ...query,
    };

    return this.amqpConnection.request<FindFileMetadataByFileIdQuery.Response>({
      exchange: FindFileMetadataByFileIdQuery.exchange,
      routingKey: FindFileMetadataByFileIdQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'createMetadata')
  @Roles(Role.USER)
  @UserAccess()
  @FileAccess({
    by: {
      user: true,
    },
    search: {
      fileId: true,
    },
  })
  createMetadata(
    @TraceId() traceId: string | undefined,
    @Param('fileId', IsStringNumberPipe) fileId: string,
    @Body() body: CreateFileMetadataBodyDto,
  ) {
    const numberFileId = Number(fileId);

    const payload: CreateFileMetadataCommand.Request = {
      fileId: numberFileId,
      ...body,
    };

    return this.amqpConnection.request<CreateFileMetadataCommand.Response>({
      exchange: CreateFileMetadataCommand.exchange,
      routingKey: CreateFileMetadataCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'deleteMetadataById')
  @Roles(Role.USER)
  @UserAccess()
  @FileAccess({
    by: {
      user: true,
    },
    search: {
      fileId: true,
    },
  })
  deleteMetadataById(
    @TraceId() traceId: string | undefined,
    @Param('metadataId', IsStringNumberPipe) metadataId: string,
  ) {
    const numberMetadataId = Number(metadataId);

    const payload: DeleteFileMetadataCommand.Request = {
      id: numberMetadataId,
    };

    return this.amqpConnection.request<DeleteFileMetadataCommand.Response>({
      exchange: DeleteFileMetadataCommand.exchange,
      routingKey: DeleteFileMetadataCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
