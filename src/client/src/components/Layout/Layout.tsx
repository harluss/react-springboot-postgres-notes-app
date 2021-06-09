import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import { ReactElement } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    active: {
      background: grey[100],
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
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    title: {
      padding: theme.spacing(2),
    },
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
  const history = useHistory();
  const location = useLocation();

  const handleRedirect = (path: string) => history.push(path);
  const setActiveClass = (path: string) => (location.pathname == path ? classes.active : '');

  return (
    <div className={classes.root}>
      <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{ paper: classes.drawerPaper }}>
        <div>
          <Typography variant="h5" className={classes.title}>
            Some Notes
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => handleRedirect(item.path)}
              className={setActiveClass(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>{children}</div>
    </div>
  );
};

export default Layout;
