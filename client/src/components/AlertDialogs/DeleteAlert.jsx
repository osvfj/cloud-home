import { useRef } from 'react';
import { AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import { deleteFolderItem } from '../../utils/folderItem.utils';
import { useGetFolderData } from '../../hooks/useDir';

import Alert from '.';

export default function DeleteAlert(props) {
  const { isAlertOpen, onCloseAlert, title, newPath, isFile } = props;
  const { getCurrentFolderData } = useGetFolderData();
  const cancelRef = useRef();


  const handleDelete = () => {
    deleteFolderItem({
      path: newPath,
      update: getCurrentFolderData,
      isFile,
    });
    return onCloseAlert();
  };

  return (
    <Alert isAlertOpen={isAlertOpen} onCloseAlert={onCloseAlert} title={title}>
      <AlertDialogBody>
        Are you sure? You can't undo this action afterwards
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onCloseAlert}>
          Cancel
        </Button>
        <Button colorScheme='red' onClick={handleDelete} ml={3}>
          Delete
        </Button>
      </AlertDialogFooter>
    </Alert>
  );
}
