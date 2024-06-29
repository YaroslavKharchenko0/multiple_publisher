import { RabbitMQConfig } from "@golevelup/nestjs-rabbitmq";
import { ConfigService } from "@nestjs/config";

export const createConfigFactory = async (configService: ConfigService): Promise<RabbitMQConfig> => {
  const uri = configService.getOrThrow('RMQ_URI');

  return {
    uri,
    exchanges: [
      { name: 'example', type: 'topic' }
    ]
  };
}
