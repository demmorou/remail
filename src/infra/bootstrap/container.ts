import {
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
  asClass,
  Lifetime,
} from 'awilix';
import path from 'path';
import redis from 'redis';

import { Config } from '../config';
import RedisHandler from '../../adapters/handlers/redis/RedisHandler';

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

  const baseDir = path.resolve(`${__dirname}/../../`);

  /**
   * Lifetime:
   * Singleton: which creates a single instance throughout the application.
   * It creates the instance for the first time and reuses the same object in the all calls.
   *
   * Scoped: lifetime services are created once per request within the scope.
   * It is equivalent to a singleton in the current scope. For example,
   * in MVC it creates one instance for each HTTP request, but it uses the same
   * instance in the other calls within the same web request.
   *
   * Transient: lifetime services are created each time they are requested.
   * This lifetime works best for lightweight, stateless services.
   */

  container.loadModules([`${baseDir}/adapters/handlers/**/*.{js,ts}`], {
    resolverOptions: {
      register: asClass,
      lifetime: Lifetime.SINGLETON,
    },
    formatName: 'camelCase',
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
