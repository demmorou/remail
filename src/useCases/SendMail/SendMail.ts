import { AppContainer } from '~infra/bootstrap/container';
import IMailProvider from '~infra/providers/MailProvider/models/IMailProvider';
import IQueueProvider from '~infra/providers/QueueProvider/models/IQueueProvider';
import { Logger } from '~infra/tools/log/types';

class SendMail {
  private logger: Logger;
  private mailProvider: IMailProvider;
  private queueProvider: IQueueProvider;

  constructor(params: AppContainer) {
    this.logger = params.logger;
    this.mailProvider = params.mailProvider;
    this.queueProvider = params.queueProvider;
  }

  public async execute(input: string): Promise<void> {
    await this.mailProvider.sendMail({
      from: {
        email: 'deusimar@deusimar.com',
        name: 'deusimar',
      },
      html: '<div><p>Olá {{name}}</p></div>',
      subject: 'Ola test',
      to: {
        email: 'deusimar@deusimar.com',
        name: 'deusimar',
      },
      variables: {
        name: input,
      },
    });

    await this.queueProvider.add('Oi', input);
  }
}

export default SendMail;
