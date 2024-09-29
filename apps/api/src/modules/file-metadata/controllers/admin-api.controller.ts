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
import { IsStringNumberPipe, Roles } from '@app/utils';
import { Role } from '@app/types';
import {
  CreateFileMetadataBodyDto,
  FindFileMetadataByFileIdBodyDto,
} from '@app/dtos';

@Controller('admin/files/:fileId/metadata')
export class AdminApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/')
  @Roles(Role.ADMIN)
  findByFileId(
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
  @Roles(Role.ADMIN)
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
  @Roles(Role.ADMIN)
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
