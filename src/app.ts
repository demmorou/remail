import 'dotenv/config';

import { setupContainer } from '~infra/bootstrap/container';
import { config } from '~infra/config/index';
import { quitRedisPoller, startRedis } from '~infra/poller/RedisPoller';
import logger from '~infra/tools/log/logger';

const shutdown = (code = 0) => {
  quitRedisPoller();

  logger.info('Shutdown application');
  process.exit(code);
};

const init = async () => {
  try {
    const container = await setupContainer(config);

    await startRedis(container);
  } catch (error) {
    logger.error('Error during start the app');
    shutdown();
  }
};

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

init();
