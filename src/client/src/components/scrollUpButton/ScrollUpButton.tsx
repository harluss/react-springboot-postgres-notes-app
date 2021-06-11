import { Fab, makeStyles, Theme, useScrollTrigger, Zoom } from '@material-ui/core';
import KeyboardArrowUpOutlined from '@material-ui/icons/KeyboardArrowUpOutlined';
import { MouseEvent } from 'react';

const useStyles = makeStyles((theme: Theme) => {
  return {
    scrollUpButtom: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  };
});

const ScrollUpButton = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger({ disableHysteresis: true });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} className={classes.scrollUpButtom}>
        <Fab color="secondary" size="small">
          <KeyboardArrowUpOutlined />
        </Fab>
      </div>
    </Zoom>
  );
};

export default ScrollUpButton;
