import { ListItem, ListIcon, Divider, Heading } from '@chakra-ui/react';
import { MdAttachFile } from 'react-icons/md';

export default function File({ onOpen, file }) {
  return (
    <ListItem onClick={onOpen}>
      <ListIcon as={MdAttachFile} color='green.500' h={'10'} w={'10'} />
      <Heading as='span' size='lg' className='isTruncated'>
        {file.name}
      </Heading>
      <Divider />
    </ListItem>
  );
}
