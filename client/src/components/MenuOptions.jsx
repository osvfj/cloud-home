import {
  Menu,
  Flex,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  IconButton,
  Input,
  List,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  Icon,
  Box,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import {
  MdDelete,
  MdEdit,
  MdMenu,
  MdDownload,
  MdMoveToInbox,
  MdArrowCircleUp,
} from 'react-icons/md';
import {
  deleteFolderItem,
  renameFolderItem,
  moveFolderItem,
} from '@/utils/folderItem.utils';
import { useGetFolderData } from '@/hooks/useDir';
import { downloadFile } from '@/utils/folderItem.utils';

import Modal from './Modal';
import FolderItem from '@/components/FolderItem';

export default function MenuOptions({ parent, newPath, isFile }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isMoveOpen,
    onClose: onCloseMove,
    onOpen: onOpenMove,
  } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onClose: onCloseAlert,
    onOpen: onOpenAlert,
  } = useDisclosure();
  const cancelRef = useRef();

  const { getCurrentFolderData, getFolderData } = useGetFolderData();
  const [newName, setNewName] = useState(parent.name);
  const [folderContent, setFolderContent] = useState();
  const [currentPathNotQuery, setCurrentPathNoQuery] = useState('/');

  useEffect(() => {
    (async () => {
      const folder = await getFolderData(currentPathNotQuery);
      setFolderContent(folder);
    })();
  }, [currentPathNotQuery]);

  const upFolder = () => {
    const upPath = currentPathNotQuery.split('/').slice(0, -1).join('/');
    setCurrentPathNoQuery(upPath);
    console.log(upPath);
  };

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
            Rename
          </MenuItem>
          {isFile && (
            <MenuItem
              icon={<MdDownload />}
              onClick={() => downloadFile(newPath)}
            >
              Download
            </MenuItem>
          )}
          <MenuItem icon={<MdMoveToInbox />} onClick={onOpenMove}>
            Move
          </MenuItem>
          <MenuItem icon={<MdDelete />} onClick={onOpenAlert}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal
        isOpen={isMoveOpen}
        onClose={() => {
          setCurrentPathNoQuery('/');
          return onCloseMove();
        }}
        title='Choose the dst'
        footer={
          <Flex justifyContent='space-between' w='100%'>
            <Icon as={MdArrowCircleUp} w='2rem' h='2rem' onClick={upFolder} />
            <Button
              colorScheme='blue'
              onClick={() => {
                moveFolderItem({
                  path: newPath,
                  dstPath: currentPathNotQuery,
                  isFile,
                  update: getCurrentFolderData,
                });
                onCloseMove();
              }}
            >
              Move!
            </Button>
          </Flex>
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

      <Modal isOpen={isOpen} onClose={onClose} title='Write the new name!'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            renameFolderItem({
              path: newPath,
              name: newName,
              update: getCurrentFolderData,
              isFile,
            });
          }}
        >
          <Flex gap='1rem'>
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
                    update: getCurrentFolderData,
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
