import { AppContainer } from '~infra/bootstrap/container';
import IMailProvider from '~infra/providers/MailProvider/models/IMailProvider';
import { Logger } from '~infra/tools/log/types';

class SendMail {
  private logger: Logger;
  private mailProvider: IMailProvider;

  constructor(params: AppContainer) {
    this.logger = params.logger;
    this.mailProvider = params.mailProvider;
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

    this.logger.info(input);
  }
}

export default SendMail;
