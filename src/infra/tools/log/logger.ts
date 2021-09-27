/* eslint-disable @typescript-eslint/no-explicit-any */
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
  debug: (logData: any) => pinoLogger.debug(logData),
  info: (logData: any) => pinoLogger.info(logData),
  warn: (logData: any) => pinoLogger.warn(logData),
  error: (logData: any) => pinoLogger.error(logData),
};

export default AppLogger;
