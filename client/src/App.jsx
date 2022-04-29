import { Flex } from '@chakra-ui/react';
import AppRouter from './routers/AppRouter';
import AuthRouter from './routers/AuthRouter';

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
      <AuthRouter />
    </Flex>
  );
}
