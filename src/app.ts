import { setupContainer } from './infra/container';
import { startRedis } from './infra/poller/RedisPoller';

async function init() {
  const container = await setupContainer();
  await startRedis(container);
}

init();
