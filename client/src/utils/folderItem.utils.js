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
