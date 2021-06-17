import { SyntheticEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSnackbar, setSnackbar } from './snackbarSlice';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const GlobalSnackbar = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { isOpen, message, type } = useAppSelector(selectSnackbar);

  const handleClose = (_?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setSnackbar({ isOpen: false, message, type }));
  };

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} elevation={2} variant="filled" severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GlobalSnackbar;
