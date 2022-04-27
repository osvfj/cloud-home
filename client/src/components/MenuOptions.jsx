import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MdDelete,
  MdEdit,
  MdMenu,
  MdDownload,
  MdMoveToInbox,
} from 'react-icons/md';
import { downloadFile } from '../utils/folderItem.utils';

import DeleteAlert from './AlertDialogs/DeleteAlert';
import ModalRename from './Modals/Rename/ModalRename';
import MoveModal from './Modals/Move/MoveModal';

export default function MenuOptions({ newPath, isFile }) {
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

      <MoveModal
        isMoveOpen={isMoveOpen}
        onCloseMove={onCloseMove}
        isFile={isFile}
        newPath={newPath}
      />

      <ModalRename
        isOpen={isOpen}
        onClose={onClose}
        newPath={newPath}
        isFile={isFile}
      />

      <DeleteAlert
        isAlertOpen={isAlertOpen}
        onCloseAlert={onCloseAlert}
        title='Delete'
        newPath={newPath}
        isFile={isFile}
      />
    </>
  );
}
