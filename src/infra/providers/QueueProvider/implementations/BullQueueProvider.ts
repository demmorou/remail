/* eslint-disable no-new */
import { Queue, Processor, Worker, QueueScheduler } from 'bullmq';

import { AppContainer } from '~infra/bootstrap/container';
import { Config } from '~infra/config';
import { Logger } from '~infra/tools/log/types';

import IMailQueueProvider from '../models/IMailQueueProvider';

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
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    });
  }

  async addManyJobs(jobs: string[]): Promise<void> {
    const parsedJobs = jobs.map((jobData) => {
      return { name: 'message', data: jobData };
    });

    await this.queue.addBulk(parsedJobs);
  }

  async addJob(job: string): Promise<void> {
    await this.queue.add('message', job);
  }

  process(processFunction: Processor<string>): void {
    new Worker('mail-queue', processFunction, {
      connection: {
        host: this.config.redis.host,
        password: this.config.redis.password,
        port: this.config.redis.port,
      },
      concurrency: 100,
      limiter: {
        max: 400,
        duration: 1000,
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
