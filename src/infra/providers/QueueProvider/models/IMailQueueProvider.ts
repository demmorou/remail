export interface IJob {
  data: string;
}

interface IMailQueueProvider {
  addJob(job: string): Promise<void>;
  addManyJobs(jobs: string[]): Promise<void>;
  process(processFunction: (job: IJob) => Promise<void>): void;
}

export default IMailQueueProvider;
