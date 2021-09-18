import {
  IEmailMessagePayload,
  IEMailTemplateMessagePayload,
  IMailProvider,
} from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  async sendMail({ body, subject, to }: IEmailMessagePayload): Promise<void> {
    return;
  }

  async sendMailWithTemplate<T>({
    to,
    subject,
    data,
    template,
  }: IEMailTemplateMessagePayload<T>): Promise<void> {
    return;
  }
}

export { MailProviderInMemory };
