import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const styles = (theme) => ({
  appBar: {
    position: 'absolute',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
});

class Header extends Component {
  state = {
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              DataComm Lab
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="left"
          open={this.state.open}
          onClose={this.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar} />
          <List
            component="nav"
            subheader={<ListSubheader component="div">Apps</ListSubheader>}
          >
            <ListItem button>
              <ListItemText primary="Simulator" />
            </ListItem>
            <ListItem button disabled>
              <ListItemText primary="Spectrometer" />
            </ListItem>
            <ListItem button disabled>
              <ListItemText primary="Convolutional encoder" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);
