import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
  formSection: {
    padding: theme.spacing.unit * 2,
    position: 'relative', // helps to position the 'show graph' btn
  },
  subheader: {
    fontWeight: 'bold',
  },
  launchIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

class SimulatorInput extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.formSection}>
        <Typography variant="subheading" className={classes.subheader}>
          {this.props.heading}
        </Typography>
        <IconButton
          className={classes.launchIcon}
          onClick={(evt) => this.props.onLaunch(evt)}
          title={'Show graph'}
        >
          <LaunchIcon />
        </IconButton>
        {this.props.component}
      </Paper>
    );
  }
}

SimulatorInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  heading: PropTypes.string,
  component: PropTypes.node,
  onLaunch: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(SimulatorInput);
