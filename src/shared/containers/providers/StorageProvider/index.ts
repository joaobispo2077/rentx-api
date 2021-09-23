import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

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
