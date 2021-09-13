import { setupContainer } from './infra/bootstrap/container';
import { startRedis } from './infra/poller/RedisPoller';

async function init() {
  const container = await setupContainer();
  await startRedis(container);
}

init();
