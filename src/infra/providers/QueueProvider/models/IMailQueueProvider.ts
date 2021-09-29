import SendMailDTO from '~infra/providers/MailProvider/dtos/SendMailDTO';

export interface IJob {
  data: SendMailDTO;
}

interface IMailQueueProvider {
  addJob(job: IJob): Promise<void>;
  process(processFunction: (job: IJob) => Promise<void>): void;
}

export default IMailQueueProvider;
