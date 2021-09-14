import 'dotenv/config';

import { setupContainer } from './infra/bootstrap/container';
import { startRedis } from './infra/poller/RedisPoller';
import { config } from './infra/config/index';

const init = async () => {
  const container = await setupContainer(config);

  await startRedis(container);
};

init();
