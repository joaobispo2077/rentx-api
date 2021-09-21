import { S3 } from 'aws-sdk';
import fs from 'fs/promises';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';
import { deleteFile } from '@utils/file';

import { IStorageProvider } from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalFilename = resolve(upload.tmpFolder, file);

    const fileContent = await fs.readFile(originalFilename);
    const fileContentType = mime.getType(originalFilename);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_S3_BUCKET_NAME}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: fileContentType as string,
      })
      .promise();

    await deleteFile(originalFilename);

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_S3_BUCKET_NAME}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
