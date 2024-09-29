import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateFileMetadataCommand,
  DeleteFileMetadataCommand,
  FindFileMetadataByFileIdQuery,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { FileAccess, IsStringNumberPipe, Roles, UserAccess } from '@app/utils';
import { Role } from '@app/types';
import {
  CreateFileMetadataBodyDto,
  FindFileMetadataByFileIdBodyDto,
} from '@app/dtos';

@Controller('/users/:userId/files/:fileId/metadata')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/')
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

  @Post('/')
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

  @Delete('/:metadataId')
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
