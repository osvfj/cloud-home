import {
  Menu,
  Flex,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  IconButton,
  Input,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { MdDelete, MdEdit, MdMenu, MdDownload } from 'react-icons/md';
import { deleteFolderItem, renameFolderItem } from '@/utils/folderItem.utils';
import { useGetFolderData } from '@/hooks/useDir';
import { downloadFile } from '@/utils/folderItem.utils';

import Modal from './Modal';

export default function MenuOptions({ parent, newPath, isFile }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onClose: onCloseAlert,
    onOpen: onOpenAlert,
  } = useDisclosure();
  const cancelRef = useRef();
  const { getFolderData } = useGetFolderData();
  const [newName, setNewName] = useState(parent.name);

  return (
    <>
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<MdMenu />}
          variant='outline'
        />
        <MenuList>
          <MenuItem icon={<MdEdit />} onClick={onOpen}>
            Edit name
          </MenuItem>
          {isFile && (
            <MenuItem
              icon={<MdDownload />}
              onClick={() => downloadFile(newPath)}
            >
              Download
            </MenuItem>
          )}
          <MenuItem icon={<MdDelete />} onClick={onOpenAlert}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose} title='Write the new name!'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            renameFolderItem({
              path: newPath,
              name: newName,
              update: getFolderData,
              isFile,
            });
          }}
        >
          <Flex justifyContent='column' gap='1rem'>
            <Input
              type='text'
              placeholder='Write here the name'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button colorScheme='green' type='submit'>
              Change!
            </Button>
          </Flex>
        </form>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  deleteFolderItem({
                    path: newPath,
                    update: getFolderData,
                    isFile,
                  });
                  onCloseAlert();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
