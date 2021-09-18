export interface IEmailMessagePayload {
  to: string;
  subject: string;
  body: string;
}

interface IMailProvider {
  sendMail({ body, subject, to }: IEmailMessagePayload): Promise<void>;
}

export { IMailProvider };
