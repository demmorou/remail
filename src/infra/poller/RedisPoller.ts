import RedisHandler from 'adapters/handlers/redis/RedisHandler';
import { AwilixContainer } from 'awilix';
import { RedisClient } from 'redis';

/**
 * TODO:
 * Change where to load channel from, automate this from a database, for example
 */

export enum Channels {
  SENDMAIL = 'sendmail',
}

export const startRedis = async (container: AwilixContainer) => {
  const subscriber = container.resolve<RedisClient>('subscriber');
  const redisHandler = container.resolve<RedisHandler>('redisHandler');

  subscriber.on('connect', () => {
    console.log('Redis poller has been started');
  });

  subscriber.on('message', async (channel: string, message: string) => {
    await redisHandler.redisHandler(channel, message);
  });

  subscriber.subscribe([Channels.SENDMAIL], () => {
    console.log('Subscribed');
  });
};

export const quitRedisPoller = (container: AwilixContainer) => {
  const subscriber = container.resolve<RedisClient>('subscriber');

  subscriber.quit(() => {
    console.log('Shutdown redis poller');
  });
};
