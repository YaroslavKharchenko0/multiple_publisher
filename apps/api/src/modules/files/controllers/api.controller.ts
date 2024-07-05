import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Delete, ForbiddenException, Get, Param, Query } from "@nestjs/common";
import { DeleteFileCommand, FindUserFilesQuery } from '@app/contracts'
import { TraceId } from "@app/logger";
import { Auth, IsStringNumberPipe, JWTUser, User } from "@app/utils";
import { FindUserFilesBodyDto } from "@app/validation";

@Controller('')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/users/:id/files')
  @Auth()
  findUserFiles(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string, @Query() query: FindUserFilesBodyDto, @User() user: JWTUser) {
    const numberId = Number(id);

    if (!user.isMe(numberId) && !user.isAdmin()) {
      throw new ForbiddenException()
    }

    const payload: FindUserFilesQuery.Request = {
      userId: numberId,
      ...query,
    }

    return this.amqpConnection.request<FindUserFilesQuery.Response>({
      exchange: FindUserFilesQuery.exchange,
      routingKey: FindUserFilesQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Delete('/users/:id/files/:fileId')
  @Auth()
  deleteUserFile(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string, @Param('fileId', IsStringNumberPipe) fileId: string, @User() user: JWTUser) {
    const numberId = Number(id);

    if (!user.isMe(numberId) && !user.isAdmin()) {
      throw new ForbiddenException()
    }

    const payload: DeleteFileCommand.Request = {
      userId: numberId,
      id: Number(fileId)
    }

    return this.amqpConnection.request<DeleteFileCommand.Response>({
      exchange: DeleteFileCommand.exchange,
      routingKey: DeleteFileCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }
}
