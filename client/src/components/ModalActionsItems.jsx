import { Button, Box } from '@chakra-ui/react';
import { useRef } from 'react';
import { MdUploadFile, MdFolderOpen } from 'react-icons/md';

export default function ModalActionsItems({ setShowForm }) {
  const fileRef = useRef();

  return (
    <>
      <Button colorScheme='green' onClick={() => setShowForm(true)}>
        <Box as={MdFolderOpen} w='1.5rem' h='1.5rem' />
        Create a dir
      </Button>
      <Button colorScheme='blue' onClick={() => fileRef.current.click()}>
        <Box as={MdUploadFile} w='1.5rem' h='1.5rem' />
        Upload a file
      </Button>

      <input
        type='file'
        name='file'
        ref={fileRef}
        onChange={(e) => setFileUpload(e.target.files)}
        style={{ display: 'none' }}
      />
    </>
  );
}
