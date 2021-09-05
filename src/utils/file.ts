import fs from 'fs/promises';

export const deleteFile = async (filepath: string): Promise<void> => {
  try {
    await fs.stat(filepath);
    await fs.unlink(filepath);
  } catch (err: any) {
    console.error(err);
    console.error(err.name);
    console.error(err.message);
    return;
  }
};
