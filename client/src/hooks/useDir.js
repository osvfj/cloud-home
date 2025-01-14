import { useContext } from 'react';
import { PathContext } from '../context/index';

import api from '../api/index';
const dir = api.dir();

export const useGetFolderData = () => {
  const { setFolderContent, currentPath } = useContext(PathContext);

  const getCurrentFolderData = async () => {
    const folder = await dir.get(currentPath);
    setFolderContent(folder);
  };

  const getFolderData = async (path) => {
    return await dir.get(path);
  };

  return { getCurrentFolderData, getFolderData };
};
