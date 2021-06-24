import { SyntheticEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { closeSnackbar, selectSnackbar } from './snackbarSlice';

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

  const duration = type === 'error' ? 5000 : 3000;

  const handleClose = (_?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} elevation={2} variant="filled" severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GlobalSnackbar;
