import nodemailer, { Transporter } from 'nodemailer';

import { IEmailMessagePayload, IMailProvider } from '../IMailProvider';

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
}

export { EtherealMailProvider };
