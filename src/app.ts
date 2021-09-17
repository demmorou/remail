import 'dotenv/config';
import logger from './infra/tools/log/logger';

import { setupContainer } from './infra/bootstrap/container';
import { config } from './infra/config/index';
import { quitRedisPoller, startRedis } from './infra/poller/RedisPoller';

const init = async () => {
  const container = await setupContainer(config);

  await startRedis(container);
};

const shutdown = () => {
  quitRedisPoller();
  logger.info('Shutdown application');
};

process.on('SIGINT', () => shutdown());

init();
