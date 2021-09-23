import { SES } from 'aws-sdk';
import fs from 'fs/promises';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import {
  IEmailMessagePayload,
  IEMailTemplateMessagePayload,
  IMailProvider,
} from '../IMailProvider';

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail({ body, subject, to }: IEmailMessagePayload): Promise<void> {
    await this.client.sendMail({
      from: 'Renxt <contato@vivijojo.com>',
      to,
      subject,
      html: body,
      text: body,
    });
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
export { SESMailProvider };
