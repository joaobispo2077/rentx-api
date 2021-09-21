import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);

const storageProviderByStorageType = {
  s3: S3StorageProvider,
  local: LocalStorageProvider,
};

const storageType = process.env.STORAGE_PROVIDER
  ? process.env.STORAGE_PROVIDER
  : 'local';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProviderByStorageType[
    storageType as keyof typeof storageProviderByStorageType
  ],
);
