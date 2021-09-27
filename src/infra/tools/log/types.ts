/* eslint-disable @typescript-eslint/no-explicit-any */
export type LogMethod = (logData: any) => void;

export type Logger = {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
};
