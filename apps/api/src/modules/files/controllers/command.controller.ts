import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { CreateFileCommand, createSuccessResponse, DeleteFileCommand, UpdateFileCommand } from "@app/contracts";
import { FILE_SERVICE } from "../providers/file.providers";
import { FileService } from "../services/files.service";

@Controller()
export class CommandController {
  constructor(@Inject(FILE_SERVICE) private readonly fileService: FileService) { }

  @RabbitRPC({
    exchange: CreateFileCommand.exchange,
    routingKey: CreateFileCommand.routingKey,
    queue: CreateFileCommand.queue,
  })
  async createFile(@RabbitPayload() message: CreateFileCommand.Request): Promise<CreateFileCommand.Response> {
    const payload = await this.fileService.createOne({
      authorId: message.authorId,
      providerId: message.providerId,
      type: message.type,
      uploadStatus: message.uploadStatus,
    })

    return createSuccessResponse(payload)
  }

  @RabbitRPC({
    exchange: DeleteFileCommand.exchange,
    routingKey: DeleteFileCommand.routingKey,
    queue: DeleteFileCommand.queue,
  })
  async deleteFile(@RabbitPayload() message: DeleteFileCommand.Request): Promise<DeleteFileCommand.Response> {
    const payload = await this.fileService.deleteById(message.id, message.userId)

    return createSuccessResponse(payload)
  }

  @RabbitRPC({
    exchange: UpdateFileCommand.exchange,
    routingKey: UpdateFileCommand.routingKey,
    queue: UpdateFileCommand.queue,
  })
  async updateFile(@RabbitPayload() message: UpdateFileCommand.Request): Promise<UpdateFileCommand.Response> {
    const payload = await this.fileService.updateById(message.id, message)

    return createSuccessResponse(payload)
  }
}

