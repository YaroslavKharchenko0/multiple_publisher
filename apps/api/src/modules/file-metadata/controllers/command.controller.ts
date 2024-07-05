import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { CreateFileMetadataCommand, createSuccessResponse, DeleteFileMetadataCommand } from "@app/contracts";
import { FileMetadataService } from "../services/file-metadata.service";
import { FILE_METADATA_SERVICE } from "../providers/file-metadata.poviders";

@Controller()
export class CommandController {
  constructor(@Inject(FILE_METADATA_SERVICE) private readonly service: FileMetadataService) { }

  @RabbitRPC({
    exchange: CreateFileMetadataCommand.exchange,
    routingKey: CreateFileMetadataCommand.routingKey,
    queue: CreateFileMetadataCommand.queue,
  })
  async create(@RabbitPayload() message: CreateFileMetadataCommand.Request): Promise<CreateFileMetadataCommand.Response> {
    const payload = await this.service.createOne({
      fileId: message.fileId,
      key: message.key,
      value: message.value,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeleteFileMetadataCommand.exchange,
    routingKey: DeleteFileMetadataCommand.routingKey,
    queue: DeleteFileMetadataCommand.queue,
  })
  async delete(@RabbitPayload() message: DeleteFileMetadataCommand.Request): Promise<CreateFileMetadataCommand.Response> {
    await this.service.deleteById(message.id);

    return createSuccessResponse(null);
  }
}

