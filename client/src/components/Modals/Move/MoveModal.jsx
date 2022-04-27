import { useState, useEffect } from 'react';
import { List } from '@chakra-ui/react';
import { useGetFolderData } from '../../../hooks/useDir';

import Modal from '../../Modals/index';
import FolderItem from '../../FolderItems/index';
import Footer from './Footer';

export default function MoveModal(props) {
  const { isMoveOpen, onCloseMove, isFile, newPath } = props;

  const { getFolderData } = useGetFolderData();
  const [folderContent, setFolderContent] = useState();
  const [currentPathNotQuery, setCurrentPathNoQuery] = useState('/');

  useEffect(() => {
    (async () => {
      const folder = await getFolderData(currentPathNotQuery);
      setFolderContent(folder);
    })();
  }, [currentPathNotQuery]);

  const handleOnclose = () => {
    setCurrentPathNoQuery('/');
    return onCloseMove();
  };

  return (
    <Modal
      isOpen={isMoveOpen}
      onClose={handleOnclose}
      title='Choose the dst'
      footer={
        <Footer
          newPath={newPath}
          currentPathNotQuery={currentPathNotQuery}
          isFile={isFile}
          setCurrentPathNoQuery={setCurrentPathNoQuery}
        />
      }
    >
      <List w={'100%'}>
        {folderContent?.folders.map((folder) => (
          <FolderItem
            data={folder}
            key={folder.name}
            isNotPathBased
            setCurrentPathNotQuery={setCurrentPathNoQuery}
            currentPathNotQuery={currentPathNotQuery}
          />
        ))}
      </List>
    </Modal>
  );
}
