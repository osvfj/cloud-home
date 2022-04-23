import { createContext, useState } from 'react';
import { usePath } from '@/hooks/usePath';

export const PathContext = createContext();

export function PathProvider({ children }) {
  const { currentPath } = usePath();
  const [folderContent, setFolderContent] = useState();

  return (
    <PathContext.Provider
      value={{
        currentPath,
        folderContent,
        setFolderContent,
      }}
    >
      {children}
    </PathContext.Provider>
  );
}
