import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const storageProviderByStorageType = {
  s3: container.resolve(S3StorageProvider),
  local: container.resolve(LocalStorageProvider),
};

const storageType = process.env.STORAGE_PROVIDER
  ? process.env.STORAGE_PROVIDER
  : 'local';

const StorageProvider =
  storageProviderByStorageType[
    storageType as keyof typeof storageProviderByStorageType
  ];

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  StorageProvider,
);
