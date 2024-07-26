import { OnCreatePublicationEvent } from '@app/contracts';
import { PostFacade } from '@app/utils';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { PublicationFacade } from 'libs/utils/src/facades/publication.facade';

@Controller()
export class EventController {
  constructor(
    private readonly publicationFacade: PublicationFacade,
    private readonly postFacade: PostFacade,
  ) { }

  @RabbitSubscribe({
    exchange: OnCreatePublicationEvent.exchange,
    routingKey: OnCreatePublicationEvent.routingKey,
    queue: OnCreatePublicationEvent.queue,
  })
  async onCreatePublication(
    @RabbitPayload() message: OnCreatePublicationEvent.Request,
  ): Promise<void> {
    const postFiles = await this.postFacade.findPostFiles(message.postId);

    if (!postFiles || !postFiles?.length) {
      return;
    }

    const fileIds = postFiles.map((file) => file.fileId);

    const payload = {
      publicationId: message.id,
      fileIds,
      isOriginal: true,
    };

    await this.publicationFacade.createPublicationFiles(payload);
  }
}
