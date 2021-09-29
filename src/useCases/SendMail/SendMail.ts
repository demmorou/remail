import { AppContainer } from '~infra/bootstrap/container';
import IMailProvider from '~infra/providers/MailProvider/models/IMailProvider';
import IMailQueueProvider from '~infra/providers/QueueProvider/models/IMailQueueProvider';
import { Logger } from '~infra/tools/log/types';

class SendMail {
  private logger: Logger;
  private mailQueueProvider: IMailQueueProvider;

  constructor(params: AppContainer) {
    this.logger = params.logger;
    this.mailQueueProvider = params.mailQueueProvider;
  }

  public async execute(input: string): Promise<void> {
    // await this.mailProvider.sendMail({
    //   from: {
    //     email: 'deusimar@deusimar.com',
    //     name: 'deusimar',
    //   },
    //   html: '<div><p>Olá {{name}}</p></div>',
    //   subject: 'Ola test',
    //   to: {
    //     email: 'deusimar@deusimar.com',
    //     name: 'deusimar',
    //   },
    //   variables: {
    //     name: input,
    //   },
    // });

    await this.mailQueueProvider.addJob('Oi');
  }
}

export default SendMail;
