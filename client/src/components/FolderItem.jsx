import { useContext } from 'react';
import { PathContext } from '@/context';
import { Flex, useDisclosure, Box } from '@chakra-ui/react';

import MenuOptions from './MenuOptions';
import ModalPlayer from './ModalPlayer';
import File from './File';
import Folder from './Folder';

export default function FolderItem({
  data,
  isFile,
  isNotPathBased,
  setCurrentPathNotQuery,
  currentPathNotQuery,
}) {
  const { currentPath } = useContext(PathContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const newPath =
    currentPath === '/' ? `/${data.name}` : `${currentPath}/${data.name}`;
''
  return (
    <Flex justifyContent='space-between'>
      <Box w='100%'>
        {isFile ? (
          <File onOpen={onOpen} file={data} />
        ) : (
          <Folder
            path={newPath}
            folder={data}
            isNotPathBased={isNotPathBased}
            setCurrentPathNotQuery={setCurrentPathNotQuery}
            currentPathNotQuery={currentPathNotQuery}
          />
        )}
      </Box>
      {!isNotPathBased && (
        <MenuOptions parent={data} newPath={newPath} isFile={isFile} />
      )}
      <ModalPlayer
        isOpen={isOpen}
        onClose={onClose}
        isFile={isFile}
        data={data}
        path={newPath}
      />
    </Flex>
  );
}
