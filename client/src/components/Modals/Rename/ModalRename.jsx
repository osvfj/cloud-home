import { useState } from 'react';
import { useGetFolderData } from '../../../hooks/useDir';
import { renameFolderItem } from '../../../utils/folderItem.utils';
import { Flex, Input, Button } from '@chakra-ui/react';

import Modal from '../index';

export default function ModalRename({ isOpen, onClose, newPath, isFile }) {
  const [newName, setNewName] = useState(parent.name);
  const { getCurrentFolderData } = useGetFolderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    renameFolderItem({
      path: newPath,
      name: newName,
      update: getCurrentFolderData,
      isFile,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Write the new name!'>
      <form onSubmit={handleSubmit}>
        <Flex gap='1rem'>
          <Input
            type='text'
            placeholder='Write here the name'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button colorScheme='green' type='submit'>
            Change!
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}
