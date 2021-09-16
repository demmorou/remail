import 'dotenv/config';

import { AwilixContainer } from 'awilix';

import { setupContainer } from './infra/bootstrap/container';
import { config } from './infra/config/index';
import { quitRedisPoller, startRedis } from './infra/poller/RedisPoller';

const shutdown = (container: AwilixContainer) => {
  quitRedisPoller(container);
};

const init = async () => {
  const container = await setupContainer(config);

  await startRedis(container);

  process.on('SIGINT', () => {
    shutdown(container);
  });
};

init();
