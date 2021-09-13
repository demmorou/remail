import { AwilixContainer } from 'awilix';
import { RedisClient } from 'redis';

export const startRedis = async (container: AwilixContainer) => {
  const subscriber = container.resolve<RedisClient>('subscriber');

  subscriber.on('connect', () => {
    console.log('Redis poller started');
  });

  subscriber.on('message', (channel: string, message: string) => {
    console.log({ message });
  });

  subscriber.subscribe(['sendmail'], () => {
    console.log('Subscribed');
  });
};
