/* eslint-disable no-new */
import { Queue, Processor, Worker, QueueScheduler } from 'bullmq';

import { AppContainer } from '~infra/bootstrap/container';
import { Config } from '~infra/config';
import SendMailDTO from '~infra/providers/MailProvider/dtos/SendMailDTO';
import { Logger } from '~infra/tools/log/types';

import IMailQueueProvider, { IJob } from '../models/IMailQueueProvider';

class BullQueueProvider implements IMailQueueProvider {
  private logger: Logger;
  private queue: Queue;
  private config: Config;

  constructor(params: AppContainer) {
    this.logger = params.logger;
    this.config = params.config;

    this.queue = new Queue('mail-queue', {
      connection: {
        host: this.config.redis.host,
        password: this.config.redis.password,
        port: this.config.redis.port,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 5,
      },
    });
  }

  async addJob(job: IJob): Promise<void> {
    await this.queue.add('message', job);
  }

  process(processFunction: Processor<SendMailDTO>): void {
    new Worker('mail-queue', processFunction, {
      connection: {
        host: this.config.redis.host,
        password: this.config.redis.password,
        port: this.config.redis.port,
      },
    });

    new QueueScheduler('mail-queue', {
      connection: {
        host: this.config.redis.host,
        password: this.config.redis.password,
        port: this.config.redis.port,
      },
    });
  }
}

export default BullQueueProvider;
