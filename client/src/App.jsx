import { Flex, Button, Box, useDisclosure } from '@chakra-ui/react';
import { MdAddCircleOutline } from 'react-icons/md';

import AppRouter from './routers/AppRouter';
import PathIndicator from './components/PathIndicator';
import ModalActions from './components/Modals/Actions/ModalActions';

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <PathIndicator />
      <Flex justify='center' alignItems='center' h='100%' margin='1rem'>
        <AppRouter />
      </Flex>
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
    </Box>
  );
}
