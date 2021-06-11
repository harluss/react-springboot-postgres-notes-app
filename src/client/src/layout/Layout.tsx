import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { ReactElement, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => {
  return {
    active: {
      background: grey[100],
    },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    content: {
      background: grey[50],
      height: '100%',
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexSrink: 0,
      },
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
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

const Layout = ({ children }: { children: ReactElement }) => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const setActiveClass = (path: string) => (location.pathname == path ? classes.active : '');

  const drawer = (
    <div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            component={Link}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={setActiveClass(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" elevation={2}>
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start" onClick={handleDrawerToggle} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>Welcome to Some Notes</Typography>
          <IconButton color="inherit">
            <InsertEmoticon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeft />
              </IconButton>
            </div>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="js">
          <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant="permanent" open>
            <div className={classes.toolbar}></div>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
