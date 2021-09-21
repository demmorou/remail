import { AppContainer } from '~infra/bootstrap/container';
import { Channels } from '~infra/poller/RedisPoller';
import { Logger } from '~infra/tools/log/types';

import SendMail from '~useCases/SendMail/SendMail';

class RedisHandler {
  private logger: Logger;
  private sendMail: SendMail;

  constructor(params: AppContainer) {
    this.logger = params.logger;
    this.sendMail = params.sendMail;
  }

  public async redisHandler(channel: string, message: string): Promise<void> {
    switch (channel) {
      case Channels.SENDMAIL:
        /**
         * TODO:
         * Add input json validator for main fields in a e-mail
         */
        await this.sendMail.execute(message);
        break;
      default:
        this.logger.info('default');
        break;
    }
  }
}

export default RedisHandler;
