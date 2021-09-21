import { AppContainer } from '~infra/bootstrap/container';
import { Logger } from '~infra/tools/log/types';

class SendMail {
  private logger: Logger;

  constructor(params: AppContainer) {
    this.logger = params.logger;
  }

  public async execute(input: string): Promise<void> {
    this.logger.info(input);
  }
}

export default SendMail;
