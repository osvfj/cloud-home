import { useRef } from 'react';
import { Flex, Button, Box, useDisclosure } from '@chakra-ui/react';
import { MdAddCircleOutline, MdUploadFile, MdFolderOpen } from 'react-icons/md';

import Modal from '@/components/Modal';
import AppRouter from '@/routers/AppRouter';
import PathIndicator from '@/components/PathIndicator';

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileRef = useRef();

  return (
    <>
      <PathIndicator />
      <Flex
        justify='center'
        alignItems='center'
        h='100%'
        margin='1rem'
      >
        <AppRouter />
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title='Select your action'
        marginTop='13rem'
      >
        <Flex justifyContent='space-evenly'>
          <Button colorScheme='green'>
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
        </Flex>
      </Modal>

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
    </>
  );
}
