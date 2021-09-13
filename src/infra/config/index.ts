import { ClientOpts } from 'redis';

export type Config = {
  redis: ClientOpts;
};

export const config: Config = {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
  },
};
