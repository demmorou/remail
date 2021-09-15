import { Channels } from '../../../infra/poller/RedisPoller';

class RedisHandler {
  public async redisHandler(channel: string, message: string): Promise<void> {
    switch (channel) {
      case Channels.SENDMAIL:
        console.log(message);
        break;
      default:
        console.log('default');
        break;
    }
  }
}

export { RedisHandler };
