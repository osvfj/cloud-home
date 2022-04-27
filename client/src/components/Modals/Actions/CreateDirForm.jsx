import { useState } from 'react';
import { createFolder } from '../../../utils/folderItem.utils';
import { usePath } from '../../../hooks/usePath';
import { useGetFolderData } from '../../../hooks/useDir';
import { Flex, Button, Input } from '@chakra-ui/react';

export default function CreateDirForm({ setShowForm, onClose }) {
  const [folderName, setFolderName] = useState('');
  const { currentPath } = usePath();
  const { getCurrentFolderData } = useGetFolderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    createFolder({
      path: currentPath,
      name: folderName,
      update: getCurrentFolderData,
    });
    setShowForm(false);
    return onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap='1rem'>
        <Input
          placeholder='Folder name'
          onChange={(e) => setFolderName(e.target.value)}
        />
        <Button colorScheme='green' type='submit'>
          Create
        </Button>
      </Flex>
    </form>
  );
}
