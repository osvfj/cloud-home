import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Icon, Heading, Flex, Input } from '@chakra-ui/react';
import { MdArrowCircleUp, MdRefresh } from 'react-icons/md';
import { useGetFolderData } from '../hooks/useDir';
import { usePath } from '../hooks/usePath';

export default function PathIndicator() {
  const { currentPath, setCurrentPath } = usePath();
  const { getCurrentFolderData } = useGetFolderData();
  const [edit, setEdit] = useState(false);
  const [newPath, setNewPath] = useState(currentPath);

  const parsePath = currentPath.split('/');

  useEffect(() => {
    setNewPath(currentPath);
  }, [currentPath]);

  const upFolder = () => {
    const path = parsePath.slice(0, -1).join('/');
    setCurrentPath({ path });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPath({ path: newPath });
  };

  return (
    <Flex bg='green.500' justifyContent='space-between' padding='0.8rem' w="100%">
      <Box onDoubleClick={() => setEdit(!edit)}>
        {edit && (
          <form onSubmit={handleSubmit}>
            <Input
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
            />
          </form>
        )}
        {!edit &&
          parsePath.map((path, i) => (
            <Heading as='span' size='lg' fontSize='20px' key={i}>
              <Link to={`?path=${path}`}>{path}</Link>
              {'>'}
            </Heading>
          ))}
      </Box>
      <Box>
        <Icon as={MdArrowCircleUp} w='2rem' h='2rem' onClick={upFolder} />
        <Icon as={MdRefresh} w='2rem' h='2rem' onClick={getCurrentFolderData} />
      </Box>
    </Flex>
  );
}
