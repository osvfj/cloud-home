import { useContext, useEffect } from 'react';
import { PathContext } from '@/context';
import { List } from '@chakra-ui/react';
import { useGetFolderData } from '@/hooks/useDir';

import FolderItem from '@/components/FolderItem';

export default function Home() {
  const { currentPath, folderContent } = useContext(PathContext);
  const { getCurrentFolderData } = useGetFolderData();

  useEffect(() => {
    getCurrentFolderData();
  }, [currentPath]);

  return (
    <>
      <List w={'100%'}>
        {folderContent?.folders.map((folder) => (
          <FolderItem data={folder} key={folder.name} />
        ))}
        {folderContent?.files.map((file) => (
          <FolderItem data={file} key={file.name} isFile/>
        ))}
      </List>
    </>
  );
}
