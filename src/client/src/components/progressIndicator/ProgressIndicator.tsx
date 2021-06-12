import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      marginTop: 100,
    },
  };
});

const ProgressIndicator = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default ProgressIndicator;
