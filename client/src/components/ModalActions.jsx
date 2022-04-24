import { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import Modal from '@/components/Modal';
import CreateDirForm from '@/components/CreateDirForm';
import ModalActionsItems from '@/components/ModalActionsItems';

export default function ModalActions({ isOpen, onClose }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowForm(false);
        return onClose();
      }}
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
