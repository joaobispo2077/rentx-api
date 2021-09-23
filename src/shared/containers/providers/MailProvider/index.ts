import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const mailProviderProviderByProviderType = {
  ses: container.resolve(SESMailProvider),
  local: container.resolve(EtherealMailProvider),
};

const mailProvider =
  mailProviderProviderByProviderType[
    process.env.MAIL_PROVIDER as keyof typeof mailProviderProviderByProviderType
  ];

container.registerInstance<IMailProvider>('MailProvider', mailProvider);
