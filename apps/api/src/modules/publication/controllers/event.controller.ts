import { EventEvent } from '@app/contracts';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';

@Controller()
export class EventController {
  @RabbitSubscribe({
    exchange: EventEvent.exchange,
    routingKey: EventEvent.routingKey,
    queue: EventEvent.queue,
  })
  event(@RabbitPayload() message: EventEvent.Request): void {
    console.log('Event', message);
  }
}
