import { useGetFolderData } from '../../../hooks/useDir';
import { Flex, Button, Icon } from '@chakra-ui/react';
import { moveFolderItem } from '../../../utils/folderItem.utils';
import { MdArrowCircleUp } from 'react-icons/md';

export default function Footer(props) {
  const {
    newPath,
    currentPathNotQuery,
    isFile,
    setCurrentPathNoQuery,
  } = props;

  const { getCurrentFolderData } = useGetFolderData();
  
  const handleMoveClick = () => {
    moveFolderItem({
      path: newPath,
      dstPath: currentPathNotQuery,
      isFile,
      update: getCurrentFolderData,
    });
    return onCloseMove();
  };

  const upFolder = () => {
    const upPath = currentPathNotQuery.split('/').slice(0, -1).join('/');
    setCurrentPathNoQuery(upPath);
  };

  return (
    <Flex justifyContent='space-between' w='100%'>
      <Icon as={MdArrowCircleUp} w='2rem' h='2rem' onClick={upFolder} />
      <Button colorScheme='blue' onClick={handleMoveClick}>
        Move!
      </Button>
    </Flex>
  );
}
