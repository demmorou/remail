/* eslint-disable @typescript-eslint/no-explicit-any */
type MailAddress = {
  email: string;
  name: string;
};

type SendMailDTO = {
  to: MailAddress;
  from: MailAddress;
  subject: string;
  variables: any;
  html: string;
};

export default SendMailDTO;
