import { makeStyles, Theme, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme: Theme) => {
  return {
    errorContainer: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      marginTop: 100,
    },
    errorIcon: {
      marginRight: theme.spacing(1),
    },
  };
});

type MessageProps = {
  messageText: string;
  type?: 'error';
};

export const Message = ({ messageText, type }: MessageProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.errorContainer}>
      {type === 'error' && <ErrorOutlineIcon className={classes.errorIcon} data-testid="error-icon" />}
      <Typography>{messageText}</Typography>
    </Container>
  );
};
