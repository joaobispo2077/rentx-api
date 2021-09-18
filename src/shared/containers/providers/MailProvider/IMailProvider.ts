export interface IEmailMessagePayload {
  to: string;
  subject: string;
  body: string;
}

export interface IEMailTemplateMessagePayload<T>
  extends Omit<IEmailMessagePayload, 'body'> {
  template: string;
  data: T;
}

interface IMailProvider {
  sendMail({ body, subject, to }: IEmailMessagePayload): Promise<void>;
  sendMailWithTemplate<T>({
    to,
    subject,
    data,
    template,
  }: IEMailTemplateMessagePayload<T>): Promise<void>;
}

export { IMailProvider };
