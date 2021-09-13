import awilix from 'awilix';
import { RedisClient } from 'redis';

const container = awilix.createContainer();

container.register({
  subscriber: awilix.asValue(RedisClient),
});

export { container };
