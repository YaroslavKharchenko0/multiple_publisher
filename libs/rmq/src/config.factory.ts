import { RabbitMQConfig } from "@golevelup/nestjs-rabbitmq";
import { ConfigService } from "@nestjs/config";

export const createConfigFactory = async (configService: ConfigService): Promise<RabbitMQConfig> => {
  const uri = configService.getOrThrow('RMQ_URI');

  return {
    uri,
    exchanges: [
      { name: 'example', type: 'topic' },
      { name: 'auth', type: 'topic' },
      { name: 'user', type: 'topic' },
      { name: 'role', type: 'topic' },
      { name: 'user-role', type: 'topic' },
      { name: 'workspace', type: 'topic' },
      { name: 'workspace-role', type: 'topic' },
      { name: 'workspace-user', type: 'topic' },
      { name: 'file', type: 'topic' },
      { name: 'file-metadata', type: 'topic' },
    ],
    connectionInitOptions: { wait: true, timeout: 5000 },
    enableControllerDiscovery: true,
  };
}
