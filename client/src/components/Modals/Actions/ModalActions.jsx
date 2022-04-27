import { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import Modal from '../index';
import CreateDirForm from './CreateDirForm';
import ModalActionsItems from './ModalActionsItems';

export default function ModalActions({ isOpen, onClose }) {
  const [showForm, setShowForm] = useState(false);

  const handleOnClose = () => {
    setShowForm(false);
    return onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnClose}
      title='Select your action'
      marginTop='13rem'
    >
      <Flex justifyContent='space-evenly'>
        {showForm ? (
          <CreateDirForm setShowForm={setShowForm} onClose={onClose} />
        ) : (
          <ModalActionsItems setShowForm={setShowForm} />
        )}
      </Flex>
    </Modal>
  );
}
