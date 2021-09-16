import { AppContainer } from 'infra/bootstrap/container';
import { Logger } from 'pino';
import { Channels } from '../../../infra/poller/RedisPoller';

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
        console.log('default');
        break;
    }
  }
}

export default RedisHandler;
