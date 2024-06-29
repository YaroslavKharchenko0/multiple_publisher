import { ConfigService } from "@nestjs/config";
import { LoggerFactory, LoggerLevel } from "./logger.factory";

const createLogger = (configService: ConfigService) => {
  const appName = configService.getOrThrow<string>('APP_NAME');
  const level = configService.getOrThrow<LoggerLevel>('LOG_LEVEL');
  const useJsonLogger = configService.get<boolean>('LOG_JSON', true);

  const logger = LoggerFactory({
    appName,
    level,
    useJsonLogger,
  })

  return logger;
}

export { createLogger }
