import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface DeleteAlertDialogProps {
  isOpen: boolean;
  onCloseCancel: () => void;
  onCloseDelete: () => void;
}

export const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
  isOpen,
  onCloseCancel,
  onCloseDelete,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>警告</AlertDialogHeader>
          <AlertDialogBody>
            完全に削除しますか？
            <br />
            この操作は元に戻すことができません。
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseCancel}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={onCloseDelete} ml={3}>
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
