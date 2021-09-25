import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { AppContainer } from '~infra/bootstrap/container';
import { Logger } from '~infra/tools/log/types';

import SendMailDTO from '../dtos/SendMailDTO';
import IMailProvider from '../models/IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  private logger: Logger;

  constructor(params: AppContainer) {
    this.logger = params.logger;

    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }

  async sendMail({
    variables,
    from,
    html,
    subject,
    to,
  }: SendMailDTO): Promise<void> {
    const templateParse = handlebars.compile(html);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to: {
        address: to.email,
        name: to.name,
      },
      from: {
        address: from.email,
        name: from.name,
      },
      subject,
      html: templateHtml,
    });

    this.logger.info(`Message sent to: ${message.messageId}`);
    this.logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default EtherealMailProvider;
