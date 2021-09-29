import 'dotenv/config';
import { AwilixContainer } from 'awilix';

import { setupContainer } from '~infra/bootstrap/container';
import { config } from '~infra/config';
import IMailProvider from '~infra/providers/MailProvider/models/IMailProvider';
import IMailQueueProvider from '~infra/providers/QueueProvider/models/IMailQueueProvider';
import { Logger } from '~infra/tools/log/types';

const worker = async (container: AwilixContainer): Promise<void> => {
  const mailQueueProvider =
    container.resolve<IMailQueueProvider>('mailQueueProvider');
  const mailProvider = container.resolve<IMailProvider>('mailProvider');
  const logger = container.resolve<Logger>('logger');

  return mailQueueProvider.process(async ({ data }) => {
    logger.info(data);

    await mailProvider.sendMail({
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
        name: 'Deusimar',
      },
    });
  });
};

(async () => {
  const container = await setupContainer(config);

  await worker(container);
})();
