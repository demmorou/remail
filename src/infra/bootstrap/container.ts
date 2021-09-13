import {
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
} from 'awilix';
import redis from 'redis';
import { Config } from '../config';

export type AppContainer = {
  redis: redis.RedisClient;
  subscriber: redis.RedisClient;
};

export const setupContainer = async (
  config: Config,
): Promise<AwilixContainer> => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  container.register({
    config: asValue(config),
  });

  container.register({
    redis: asValue(redis),
    subscriber: asValue(redis.createClient(config.redis)),
  });

  return container;
};
