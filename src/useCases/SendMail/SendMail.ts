import { AppContainer } from '~infra/bootstrap/container';
import IMailQueueProvider from '~infra/providers/QueueProvider/models/IMailQueueProvider';

class SendMail {
  private mailQueueProvider: IMailQueueProvider;

  constructor(params: AppContainer) {
    this.mailQueueProvider = params.mailQueueProvider;
  }

  public async execute(input: string): Promise<void> {
    await this.mailQueueProvider.addJob({
      data: {
        from: {
          email: 'deusimar@deusimar.com',
          name: 'deusimar',
        },
        html: '<div><strong>Olá {{name}}</strong></div>',
        subject: 'Ola test',
        to: {
          email: 'deusimar@deusimar.com',
          name: 'deusimar',
        },
        variables: {
          name: input,
        },
      },
    });
  }
}

export default SendMail;
