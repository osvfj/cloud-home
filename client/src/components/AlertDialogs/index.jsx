import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
} from '@chakra-ui/react';

export default function Alert({
  isAlertOpen,
  cancelRef,
  onCloseAlert,
  title,
  children,
}) {
  return (
    <AlertDialog
      isOpen={isAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          {children}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
