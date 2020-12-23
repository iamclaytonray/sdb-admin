import {
  AppBar,
  Button,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { ModalContext } from '../../context/ModalContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Layout = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const modal = React.useContext(ModalContext);

  const drawer = (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          color="secondary"
          href="https://shoreshdavidbrandon.org"
          target="_blank"
          style={{ marginTop: 16 }}
        >
          Go to website
        </Button>
      </div>
      <div className={classes.toolbar} />
      {/* <Divider /> */}
      <List style={{ paddingTop: 0, marginTop: -24 }}>
        {['Resources', 'Events', 'Sermons'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => history.push(`/dashboard/${text.toLowerCase()}`)}
            style={{
              backgroundColor: location.pathname.includes(text.toLowerCase())
                ? '#eee'
                : '#fff',
            }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" noWrap>
              {props.title}
            </Typography>
            <Button color="inherit" onClick={modal.open}>
              Help
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={props.container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={false}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};
