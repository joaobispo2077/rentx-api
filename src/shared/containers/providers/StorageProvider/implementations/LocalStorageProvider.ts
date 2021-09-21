import fs from 'fs/promises';
import { resolve } from 'path';

import upload from '@config/upload';
import { deleteFile } from '@utils/file';

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`),
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);
    await deleteFile(filename);
  }
}

export { LocalStorageProvider };
