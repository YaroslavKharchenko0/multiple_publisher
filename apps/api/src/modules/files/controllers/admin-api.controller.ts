import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import {
  DeleteFileCommand,
  FindFileByIdQuery,
  FindFileByProviderIdQuery,
  FindUserFilesQuery,
  UpdateFileCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, Roles } from '@app/utils';
import { Role } from '@app/types';
import { UpdateFileBodyDto } from '@app/dtos';

@Controller('admin/files')
export class AdminApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Delete('/:fileId')
  @Roles(Role.ADMIN)
  deleteFile(
    @TraceId() traceId: string | undefined,
    @Param('fileId', IsStringNumberPipe) fileId: string,
  ) {
    const numberFileId = Number(fileId);

    const payload: DeleteFileCommand.Request = {
      id: numberFileId,
    };

    return this.amqpConnection.request<DeleteFileCommand.Response>({
      exchange: DeleteFileCommand.exchange,
      routingKey: DeleteFileCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('/:fileId')
  @Roles(Role.ADMIN)
  findById(
    @TraceId() traceId: string | undefined,
    @Param('fileId', IsStringNumberPipe) fileId: string,
  ) {
    const numberFileId = Number(fileId);

    const payload: FindFileByIdQuery.Request = {
      id: numberFileId,
    };

    return this.amqpConnection.request<FindFileByIdQuery.Response>({
      exchange: FindFileByIdQuery.exchange,
      routingKey: FindFileByIdQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('/providers/:providerId')
  @Roles(Role.ADMIN)
  findByProviderId(
    @TraceId() traceId: string | undefined,
    @Param('providerId') providerId: string,
  ) {
    const payload: FindFileByProviderIdQuery.Request = {
      providerId,
    };

    return this.amqpConnection.request<FindFileByProviderIdQuery.Response>({
      exchange: FindFileByProviderIdQuery.exchange,
      routingKey: FindFileByProviderIdQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('/authors/:authorId')
  @Roles(Role.ADMIN)
  findUserFile(
    @TraceId() traceId: string | undefined,
    @Param('authorId', IsStringNumberPipe) authorId: string,
  ) {
    const payload: FindUserFilesQuery.Request = {
      userId: Number(authorId),
    };

    return this.amqpConnection.request<FindUserFilesQuery.Response>({
      exchange: FindUserFilesQuery.exchange,
      routingKey: FindUserFilesQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Put('/:fileId')
  @Roles(Role.ADMIN)
  updateUserFile(
    @TraceId() traceId: string | undefined,
    @Param('fileId', IsStringNumberPipe) fileId: string,
    @Body() body: UpdateFileBodyDto,
  ) {
    const numberFileId = Number(fileId);

    const payload: UpdateFileCommand.Request = {
      id: numberFileId,
      ...body,
    };

    return this.amqpConnection.request<FindUserFilesQuery.Response>({
      exchange: UpdateFileCommand.exchange,
      routingKey: UpdateFileCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
