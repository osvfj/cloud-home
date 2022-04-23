import { ListItem, ListIcon, Divider, Heading } from '@chakra-ui/react';
import { MdFolder } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Folder({ path, folder }) {
  return (
    <Link to={`?path=${path}`}>
      <ListItem>
        <ListIcon as={MdFolder} color='green.500' h={'10'} w={'10'} />
        <Heading
          as='span'
          size='lg'
          className="isTruncated"
        >
          {folder.name}
        </Heading>
        <Divider />
      </ListItem>
    </Link>
  );
}
