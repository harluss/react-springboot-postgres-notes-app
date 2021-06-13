import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MouseEvent } from 'react';
import { selectAlertDialog, setAlertDialog } from './alertDialogSlice';

const AlertDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpen, title, details, cancelButtonText, confirmButtonText } = useAppSelector(selectAlertDialog);

  const handleClose = (_: MouseEvent<HTMLElement>, reason?: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }

    dispatch(setAlertDialog({ isOpen: false, cancelButtonText, confirmButtonText, details, title }));
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
          <Button onClick={handleClose} color="primary" autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
