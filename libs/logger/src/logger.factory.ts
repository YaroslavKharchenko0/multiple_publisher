import { transports, format } from 'winston';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';

export type LoggerLevel = 'info' | 'debug' | 'warn' | 'error' | 'verbose' | 'silly';

export type LoggerConfig = {
  level: LoggerLevel,
  appName: string,
  useJsonLogger: boolean,
}

export const LoggerFactory = (config: LoggerConfig) => {
  let consoleFormat;

  if (config.useJsonLogger) {
    consoleFormat = format.combine(format.ms(), format.timestamp(), format.json());
  } else {
    consoleFormat = format.combine(
      format.ms(),
      format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(config.appName, {
        colors: true,
        prettyPrint: true,
      }),
    );
  }

  return WinstonModule.createLogger({
    level: config.level,
    transports: [new transports.Console({ format: consoleFormat })],
  });
};
