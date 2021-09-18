import fs from 'fs/promises';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import {
  IEmailMessagePayload,
  IEMailTemplateMessagePayload,
  IMailProvider,
} from '../IMailProvider';
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
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
        console.log(err);
      });
  }

  async sendMail({ body, subject, to }: IEmailMessagePayload): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Renxt <noreply@rentx.com.br>',
      to,
      subject,
      html: body,
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

  async sendMailWithTemplate<T>({
    to,
    subject,
    data,
    template,
  }: IEMailTemplateMessagePayload<T>): Promise<void> {
    const templateFileContent = (await fs.readFile(template)).toString('utf-8');

    const compiledTemplate = handlebars.compile<T>(templateFileContent);

    const body = compiledTemplate(data);

    await this.sendMail({
      to,
      subject,
      body,
    });
  }
}

export { EtherealMailProvider };
