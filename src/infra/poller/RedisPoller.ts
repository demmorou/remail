import RedisHandler from 'adapters/handlers/redis/RedisHandler';
import { AwilixContainer } from 'awilix';
import { RedisClient } from 'redis';

import { Logger } from '~infra/tools/log/types';

/**
 * TODO:
 * Change where to load channel from, automate this from a database, for example
 */

export enum Channels {
  SENDMAIL = 'sendmail',
}

let subscriber: RedisClient = null;
let logger: Logger = null;

export const startRedis = async (container: AwilixContainer): Promise<void> => {
  subscriber = container.resolve<RedisClient>('subscriber');
  logger = container.resolve<Logger>('logger');
  const redisHandler = container.resolve<RedisHandler>('redisHandler');

  subscriber.on('connect', () => {
    logger.info('Redis poller has been started');
  });

  subscriber.on('message', async (channel: string, message: string) => {
    await redisHandler.redisHandler(channel, message);
  });

  subscriber.subscribe([Channels.SENDMAIL], () => {
    logger.info('Subscribed');
  });
};

export const quitRedisPoller = (): void => {
  subscriber.quit(() => {
    logger.info('Shutdown redis poller');
  });
};
