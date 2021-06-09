import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => {
  return {
    active: {
      background: grey[100],
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    page: {
      background: grey[50],
      width: '100%',
      height: '100vh',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  };
});

const menuItems = [
  {
    text: 'My Notes',
    icon: <SubjectOutlined />,
    path: '/',
  },
  {
    text: 'Add Note',
    icon: <AddCircleOutlineOutlined />,
    path: '/create',
  },
];

// TODO: add loader

const Layout = ({ children }: { children: ReactElement }) => {
  const classes = useStyles();
  const location = useLocation();

  const setActiveClass = (path: string) => (location.pathname == path ? classes.active : '');

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} color="inherit" elevation={2}>
        <Toolbar>
          <Typography className={classes.title}>Welcome to Some Notes</Typography>
          <IconButton>
            <InsertEmoticon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar}></div>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} button component={Link} to={item.path} className={setActiveClass(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
