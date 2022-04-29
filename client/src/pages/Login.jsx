import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Flex,
} from '@chakra-ui/react';
import { login } from '../utils/auth.utils';

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form).then(() => navigate('/'))
  };

  return (
    <Center h='50vh' minW="40%" margin="0.8rem">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection='column'>
          <FormControl>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              id='username'
              type='text'
              name='username'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              id='password'
              type='password'
              name='password'
              onChange={handleChange}
            />
          </FormControl>
          <Button type='submit' colorScheme='green' marginTop="1rem">
            Login
          </Button>
        </Flex>
      </form>
    </Center>
  );
}
