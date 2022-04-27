import {
  Modal as ModalE,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

export default function Modal(props) {
  const { children, isOpen, onClose, title, footer } = props;

  return (
    <ModalE isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        {...props}
        marginRight='10px'
        // marginBottom='0px'
        marginLeft='10px'
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {/*  <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button> */}
          {footer}
        </ModalFooter>
      </ModalContent>
    </ModalE>
  );
}
