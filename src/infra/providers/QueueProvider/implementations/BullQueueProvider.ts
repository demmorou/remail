// import bull from 'bull';

import { AppContainer } from '~infra/bootstrap/container';
// import { Config } from '~infra/config';
import { Logger } from '~infra/tools/log/types';

import IQueueProvider from '../models/IQueueProvider';

class BullQueueProvider implements IQueueProvider {
  private logger: Logger;

  constructor(params: AppContainer) {
    this.logger = params.logger;
  }

  public async add(key: string, data: unknown): Promise<void> {
    this.logger.info({
      key,
      data,
    });
  }
}

export default BullQueueProvider;
