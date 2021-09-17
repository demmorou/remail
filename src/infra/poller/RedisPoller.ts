import RedisHandler from 'adapters/handlers/redis/RedisHandler';
import { AwilixContainer } from 'awilix';
import { Logger } from 'pino';
import { RedisClient } from 'redis';

/**
 * TODO:
 * Change where to load channel from, automate this from a database, for example
 */

export enum Channels {
  SENDMAIL = 'sendmail',
}

let subscriber: RedisClient = null;
let logger: Logger = null;

export const startRedis = async (container: AwilixContainer) => {
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

export const quitRedisPoller = () => {
  subscriber.quit(() => {
    logger.info('Shutdown redis poller');
  });
};
