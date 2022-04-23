import { useContext } from 'react';
import { PathContext } from '@/context';

import api from '@/api';
const dir = api.dir();

export const useGetFolderData = () => {
  const { setFolderContent, currentPath } = useContext(PathContext);

  const getFolderData = async () => {
    const folder = await dir.get(currentPath);
    setFolderContent(folder);
  };

  return { getFolderData };
};
