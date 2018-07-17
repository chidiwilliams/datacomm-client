import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Simulator from './simulator/Simulator';
import Header from './Header/Header';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Lab extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Simulator />
        </main>
      </div>
    );
  }
}

Lab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Lab);
