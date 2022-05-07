import { Flex } from '@chakra-ui/react';
import AppRouter from './routers/AppRouter';

export default function App() {
  return (
    <Flex
      w='100%'
      h='100%'
      justify='center'
      alignItems='center'
      flexDirection='column'
    >
      <AppRouter />
    </Flex>
  );
}
