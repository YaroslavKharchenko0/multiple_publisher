import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile } from "@nestjs/common";
import { DeleteFileCommand, FindFileByIdQuery, FindFileByProviderIdQuery, FindUserFilesQuery, GenerateSignatureCommand, UpdateFileCommand, UploadFileCommand } from '@app/contracts'
import { TraceId } from "@app/logger";
import { FileAccess, ImageUpload, IsStringNumberPipe, IsUUIDPipe, Roles, UserAccess } from "@app/utils";
import { FindUserFilesBodyDto, UpdateFileBodyDto } from "@app/validation";
import { File } from '@nest-lab/fastify-multer';
import { Role } from "@app/types";

@Controller('/users/:userId/files')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('/upload/image')
  @Roles(Role.USER)
  @UserAccess()
  @ImageUpload()
  uploadFile(@TraceId() traceId: string | undefined, @Param('userId', IsStringNumberPipe) userId: string, @UploadedFile() image: File) {
    const payload: UploadFileCommand.Request = {
      userId: Number(userId),
      file: {
        buffer: image.buffer.toString('base64'),
        mimetype: image.mimetype,
        originalname: image.originalname,
        size: image.size,
      }
    }

    return this.amqpConnection.request<UploadFileCommand.Response>({
      exchange: UploadFileCommand.exchange,
      routingKey: UploadFileCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Post('/upload/video/signature')
  @Roles(Role.USER)
  @UserAccess()
  generateSignature(@TraceId() traceId: string | undefined, @Param('userId', IsStringNumberPipe) userId: string) {
    const payload: GenerateSignatureCommand.Request = {
      userId: Number(userId),
    }

    return this.amqpConnection.request<GenerateSignatureCommand.Response>({
      exchange: GenerateSignatureCommand.exchange,
      routingKey: GenerateSignatureCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Get('/:fileId')
  @Roles(Role.USER)
  @UserAccess()
  @FileAccess({
    by: {
      user: true
    },
    search: {
      fileId: true,
    }
  })
  findById(@TraceId() traceId: string | undefined, @Param('fileId', IsStringNumberPipe) fileId: string) {
    const numberFileId = Number(fileId);

    const payload: FindFileByIdQuery.Request = {
      id: numberFileId
    }

    return this.amqpConnection.request<FindFileByIdQuery.Response>({
      exchange: FindFileByIdQuery.exchange,
      routingKey: FindFileByIdQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Get('/providers/:providerId')
  @Roles(Role.USER)
  @UserAccess()
  @FileAccess({
    by: {
      user: true
    },
    search: {
      providerId: true,
    }
  })
  findByProviderId(@TraceId() traceId: string | undefined, @Param('providerId', IsUUIDPipe) providerId: string) {
    const payload: FindFileByProviderIdQuery.Request = {
      providerId,
    }

    return this.amqpConnection.request<FindFileByProviderIdQuery.Response>({
      exchange: FindFileByProviderIdQuery.exchange,
      routingKey: FindFileByProviderIdQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Get('/')
  @Roles(Role.USER)
  @UserAccess()
  findUserFiles(@TraceId() traceId: string | undefined, @Param('userId', IsStringNumberPipe) id: string, @Query() query: FindUserFilesBodyDto) {
    const numberId = Number(id);

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

  @Delete('/:fileId')
  @Roles(Role.USER)
  @FileAccess({
    by: {
      user: true
    },
    search: {
      fileId: true,
    }
  })
  @UserAccess()
  deleteUserFile(@TraceId() traceId: string | undefined, @Param('userId', IsStringNumberPipe) id: string, @Param('fileId', IsStringNumberPipe) fileId: string) {
    const numberId = Number(id);

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

  @Patch('/:fileId')
  @Roles(Role.USER)
  @FileAccess({
    by: {
      user: true
    },
    search: {
      fileId: true,
    }
  })
  @UserAccess()
  updateFile(@TraceId() traceId: string | undefined, @Param('fileId', IsStringNumberPipe) fileId: string, @Body() body: UpdateFileBodyDto) {
    const numberFileId = Number(fileId);

    const payload: UpdateFileCommand.Request = {
      id: numberFileId,
      ...body
    }

    return this.amqpConnection.request<FindUserFilesQuery.Response>({
      exchange: UpdateFileCommand.exchange,
      routingKey: UpdateFileCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }
}
