import api from '@/api';
const dir = api.dir();
const file = api.file();

export const deleteFolderItem = async ({ path, update, isFile }) => {
  isFile ? await file.delete(path) : await dir.delete(path);
  update();
};

export const renameFolderItem = async ({ path, name, update, isFile }) => {
  isFile ? await file.rename(path, name) : await dir.rename(path, name);
  update();
};

export const downloadFile = async (path) => {
  await file.download(path);
};

export const createFolder = async ({ path, name, update }) => {
  await dir.create(path, name);
  update();
};

export const moveFolderItem = async ({ path, dstPath, isFile, update }) => {
  isFile ? await file.move(path, dstPath) : await dir.move(path, dstPath);
  update();
};
