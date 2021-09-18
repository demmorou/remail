import { AppContainer } from '~infra/bootstrap/container';
import { Channels } from '~infra/poller/RedisPoller';
import { Logger } from '~infra/tools/log/types';

class RedisHandler {
  private logger: Logger;
  constructor(params: AppContainer) {
    this.logger = params.logger;
  }

  public async redisHandler(channel: string, message: string): Promise<void> {
    switch (channel) {
      case Channels.SENDMAIL:
        this.logger.info(message);
        break;
      default:
        this.logger.info('default');
        break;
    }
  }
}

export default RedisHandler;
