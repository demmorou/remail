import pino from 'pino';

import { Logger } from './types';

const pinoLogger = pino({
  name: 'remail',
  level: 'info',
  prettyPrint: {
    ignore: 'pid',
    translateTime: 'yyyy-mm-dd:HH:MM:ss:l Z',
  },
});

const AppLogger: Logger = {
  debug: (logData: string) => pinoLogger.debug(logData),
  info: (logData: string) => pinoLogger.info(logData),
  warn: (logData: string) => pinoLogger.warn(logData),
  error: (logData: string) => pinoLogger.error(logData),
};

export default AppLogger;
