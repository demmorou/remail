import SendMailDTO from '../dtos/SendMailDTO';

interface IMailProvider {
  sendMail(data: SendMailDTO): Promise<void>;
}

export default IMailProvider;
