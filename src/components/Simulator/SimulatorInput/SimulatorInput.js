import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MessageInput from './MessageInput/MessageInput';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import Encoder from './Encoder/Encoder';
import Modulator from './Modulator/Modulator';

const styles = (theme) => ({
  formSection: {
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    position: 'relative',
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
  handleMsgChange = (type, val) => {
    this.props.update(type, val);
    this.props.switchGraph(0);
  };

  handleEncChange = (enc) => {
    this.props.update('enc', enc);
    this.props.switchGraph(1);
  };

  handleModTypeChange = (type) => {
    this.props.update('mod', type);
    this.props.switchGraph(2);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.root} autoComplete="off">
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Message Input'}
            </Typography>
            <IconButton
              className={classes.launchIcon}
              onClick={() => this.props.switchGraph(0)}
            >
              <LaunchIcon />
            </IconButton>
            <MessageInput updateMsg={this.handleMsgChange} />
          </Paper>
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Encoder'}
            </Typography>
            <IconButton
              className={classes.launchIcon}
              onClick={() => this.props.switchGraph(1)}
            >
              <LaunchIcon />
            </IconButton>
            <Encoder handleEncChange={this.handleEncChange} />
          </Paper>
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Modulator'}
            </Typography>
            <IconButton
              className={classes.launchIcon}
              onClick={() => this.props.switchGraph(2)}
            >
              <LaunchIcon />
            </IconButton>
            <Modulator handleModChange={this.handleModTypeChange} />
          </Paper>
        </form>
      </div>
    );
  }
}

SimulatorInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  update: PropTypes.func,
  switchGraph: PropTypes.func.isRequired,
  currentGraph: PropTypes.number,
};

export default withStyles(styles, { withTheme: true })(SimulatorInput);
