import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { forwardRef, useImperativeHandle, useState } from 'react';

type alertDialogProps = {
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
};

const AlertDialog = forwardRef(({ title, content, confirmText, cancelText }: alertDialogProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  useImperativeHandle(ref, () => ({ showAlertDialog: handleOpen }));

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelText}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

AlertDialog.displayName = 'AlertDialog';

export default AlertDialog;
