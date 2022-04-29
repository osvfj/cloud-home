import { useContext, useEffect } from 'react';
import { PathContext } from '../context/index';
import { List, Button, Box, useDisclosure } from '@chakra-ui/react';
import { MdAddCircleOutline } from 'react-icons/md';

import { useGetFolderData } from '../hooks/useDir';

import FolderItem from '../components/FolderItems/index';
import ModalActions from '../components/Modals/Actions/ModalActions';
import PathIndicator from '../components/PathIndicator';

export default function Home() {
  const { currentPath, folderContent } = useContext(PathContext);
  const { getCurrentFolderData } = useGetFolderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getCurrentFolderData();
  }, [currentPath]);

  return (
    <>
      <PathIndicator />
      <Box marginTop='1rem' w={'95%'}>
        <List>
          {folderContent?.folders.map((folder) => (
            <FolderItem data={folder} key={folder.name} />
          ))}
          {folderContent?.files.map((file) => (
            <FolderItem data={file} key={file.name} isFile />
          ))}
        </List>
      </Box>
      <Box>
        <ModalActions isOpen={isOpen} onClose={onClose} />

        <Button
          colorScheme='green'
          position='fixed'
          right='1rem'
          bottom='3rem'
          w='4rem'
          h='4rem'
          onClick={onOpen}
        >
          <Box as={MdAddCircleOutline} w='2rem' h='2rem' />
        </Button>
      </Box>
    </>
  );
}
