import {
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
} from 'awilix';
import redis from 'redis';

export type AppContainer = {
  redis: redis.RedisClient;
  subscriber: redis.RedisClient;
};

export const setupContainer = async (): Promise<AwilixContainer> => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  container.register({
    redis: asValue(redis),
    subscriber: asValue(
      redis.createClient({
        host: 'localhost',
        port: 6379,
      }),
    ),
  });

  return container;
};
