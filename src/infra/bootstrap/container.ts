import {
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
  asClass,
} from 'awilix';
import redis from 'redis';

import { Config } from '../config';
import { RedisHandler } from '../../adapters/handlers/redis/RedisHandler';

export type AppContainer = {
  redisHandler: RedisHandler;

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
    /**
     * TODO:
     * Change to use the function loadModules
     */
    redisHandler: asClass(RedisHandler).singleton(),
    config: asValue(config),
  });

  container.register({
    redis: asValue(redis),
    subscriber: asValue(redis.createClient(config.redis)),
  });

  return container;
};
