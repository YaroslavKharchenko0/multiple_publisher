import { OnWebhookEvent } from "@app/contracts";
import { RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller, Inject } from "@nestjs/common";
import { FILE_SERVICE } from "../providers/file.providers";
import { FileService } from "../services/files.service";

@Controller()
export class EventController {
  constructor(@Inject(FILE_SERVICE) private readonly fileService: FileService) { }

  @RabbitSubscribe({
    exchange: OnWebhookEvent.exchange,
    routingKey: OnWebhookEvent.routingKey,
    queue: OnWebhookEvent.queue,
  })
  async onWebhook(@RabbitPayload() message: OnWebhookEvent.Request) {
    await this.fileService.onWebhook({
      Status: message.Status,
      VideoGuid: message.VideoGuid,
      VideoLibraryId: message.VideoLibraryId,
    });
  }
}

