import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MouseEvent } from 'react';

type alertDialogProps = {
  isOpen: boolean;
  title: string;
  details: string;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmAction: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

const AlertDialog = ({
  isOpen,
  title,
  details,
  confirmButtonText,
  cancelButtonText,
  confirmAction,
  setIsOpen,
}: alertDialogProps) => {
  const handleClose = (_: MouseEvent<HTMLElement>, reason?: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }

    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen ?? false} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{details}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelButtonText}
          </Button>
          <Button onClick={confirmAction} color="primary" autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
